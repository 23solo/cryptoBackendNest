import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class CustomAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    console.log('AuthGuard triggered'); // Log when the guard is triggered
    if (err || !user) {
      console.log('Unauthorized access:', err, info); // Log unauthorized access
      throw err || new UnauthorizedException();
    }
    return user; // Return the user object if authenticated
  }

  // Override the getRequest method to log the token
  getRequest(context: any) {
    const request = super.getRequest(context);
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request); // Extract the token
    console.log('JWT Token:', token); // Log the token
    return request;
  }
}
