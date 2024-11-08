import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { CreateUserDetailsDto } from './userDetails.dto';
import { EmailService } from 'src/email/email.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() createUserDto: CreateUserDto) {
    console.log(`Request is ${JSON.stringify(createUserDto)}`);

    const userExists = await this.userService.findOne(createUserDto.username);
    if (userExists) {
      throw new BadRequestException('Username already exists');
    }
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() createUserDto: CreateUserDto) {
    const userExists = await this.userService.findOne(createUserDto.username);
    if (!userExists) {
      throw new BadRequestException('Username does not exists');
    }
    return this.userService.login(
      createUserDto.username,
      createUserDto.password,
    );
  }

  @Post('details')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async addUserDetails(@Body() createUserDetailsDto: CreateUserDetailsDto) {
    return this.userService.addUserDetails(createUserDetailsDto);
  }

  @Post('send-email')
  async sendEmail(@Body() body: { to: string; subject: string; text: string }) {
    await this.emailService.sendEmail(body.to, body.subject, body.text);
    return { message: 'Email sent successfully' };
  }
}
