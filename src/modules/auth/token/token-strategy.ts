import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CheckTokenStrategy extends PassportStrategy(
  Strategy,
  'check-token',
) {
  constructor(
    public prisma: PrismaService,
    private configService: ConfigService,
  ) {
    const secret = configService.get<string>('ACCESS_TOKEN_SECRET');
    console.log('JWT Secret:', secret); // Debug log

    if (!secret) {
      console.error('JWT Secret is missing in environment variables');
      throw new UnauthorizedException('JWT secret is not configured');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: { userId: string }) {
    console.log(`TOKEN-VALIDATE`);
    console.log({ payload });

    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    return user;
  }
}
