import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/db/user.entity';
import { UserDetails } from 'src/db/userDetails.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from 'src/JWT/jwt.service';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserDetails]),
    JwtModule.register({
      secret: 'your_secret_key', // Replace with your secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  providers: [UserService, JwtService, EmailService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
