import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service'; // Adjust the import path as necessary
import { JwtPayload } from './jsw-payload.interface'; // Ensure this is the correct path

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.secret, // Ensure this matches the secret used to sign the token
    });
    console.log('JwtStrategy initialized'); // Log when the strategy is initialized
  }

  async validate(payload: JwtPayload) {
    // console.log('Validating JWT Payload:', payload); // Log the payload being validated
    const user = await this.userService.findById(payload.userId); // Ensure this method exists
    if (!user) {
      console.log('User not found for ID:', payload.userId); // Log if user is not found
      throw new UnauthorizedException(); // Throw an exception if user is not found
    }
    console.log('User found:', user); // Log the user object if found
    return user; // This will be attached to the request object as req.user
  }
}
