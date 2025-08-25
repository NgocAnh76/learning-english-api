import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, AuthRegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register({ email, password, name }: AuthRegisterDto) {
    if (!email) throw new BadRequestException('Email is required');
    if (!password) throw new BadRequestException('Password is required');
    if (!name) throw new BadRequestException('Name is required');

    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    const { id } = newUser;

    const tokens = await this.createToken(id);

    return {
      user: omit(newUser, ['password']),
      ...tokens,
    };
  }

  async login({ email, password }: AuthDto) {
    if (!email) throw new BadRequestException('Email is required');
    if (!password) throw new BadRequestException('Password is required');

    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new BadRequestException('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new BadRequestException('Password is incorrect');

    const { id } = user;

    const tokens = await this.createToken(id);

    return {
      user: omit(user, ['password']),
      ...tokens,
    };
  }

  async createToken(userId: string) {
    if (!userId) throw new BadRequestException('User ID is required');

    const accessTokenSecret = this.configService.get<string>(
      'ACCESS_TOKEN_SECRET',
    );
    const refreshTokenSecret = this.configService.get<string>(
      'REFRESH_TOKEN_SECRET',
    );
    const accessTokenExpire = this.configService.get<string>(
      'ACCESS_TOKEN_EXPIRED',
    );
    const refreshTokenExpire = this.configService.get<string>(
      'REFRESH_TOKEN_EXPIRED',
    );

    if (!accessTokenSecret || !refreshTokenSecret) {
      throw new InternalServerErrorException('JWT secrets are not configured');
    }

    const accessToken = await this.jwt.signAsync(
      { userId },
      {
        secret: accessTokenSecret,
        expiresIn: accessTokenExpire,
      },
    );

    const refreshToken = await this.jwt.signAsync(
      { userId },
      {
        secret: refreshTokenSecret,
        expiresIn: refreshTokenExpire,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
