import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from '../common/decorators/is-public.decorator';
import { AuthService } from './auth.service';
import { AuthDto, AuthRegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('register')
  create(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto);
  }

  @IsPublic()
  @Post('login')
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}

/**
 * nest g resource modules/auth --no-spec
 */
