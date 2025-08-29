import { Controller , Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto, LoginDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('users') // This makes the group visible in Swagger
@Controller('users')

export class UsersController {
    constructor(private usersService: UsersService) {}

    //here we get the jwt token

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto })
  login(@Body() dto: LoginDto) {
    return this.usersService.login(dto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiBody({ type: RegisterDto })
  register(@Body() dto: RegisterDto) {
    return this.usersService.register(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current logged-in user' })
  me(@Req() req) {
    return req.user;
  }
}
