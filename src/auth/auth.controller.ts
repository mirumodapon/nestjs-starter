import { Controller, Get, Req, Res, Session, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService
  ) {}

  @Get()
  async listAuth() {
    const path = this.reflector.get('path', AuthController);
    return [
      { name: 'Google', url: `/${path}/google` }
    ];
  }

  @Get('whoami')
  async whoami(@Session() session: Record<string, any>) {
    const user = session.user;

    if (user)
      return user;

    throw new UnauthorizedException();
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session: Record<string, any>
  ) {
    const _user = req.user as any;
    const [email] = _user.emails;

    const user = await this.userService.getUserByEmail(email.value) as any;

    if (!user || user.isBan) {
      throw new UnauthorizedException();
    }

    session.user = user;
    res.redirect('/auth/whoami');
  }
}
