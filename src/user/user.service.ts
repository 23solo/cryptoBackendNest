import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/db/user.entity';
import { UserDetails } from 'src/db/userDetails.entity';
import { CreateUserDto } from './user.dto';
import { CreateUserDetailsDto } from './userDetails.dto';
import { JwtService } from 'src/JWT/jwt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserDetails)
    private userDetailsRepository: Repository<UserDetails>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      username: createUserDto.username,
      password: hashedPassword,
    });
    const savedUser = await this.usersRepository.save(user);
    console.log(`Saved user is ${JSON.stringify(savedUser)}`);
    return savedUser;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async login(username: string, password: string): Promise<{ token: string }> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.generateToken(user.id, user.username); // Pass the payload
    console.log('token is ', token);

    return { token };
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async addUserDetails(
    createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<UserDetails> {
    const user = await this.usersRepository.findOne({
      where: { id: createUserDetailsDto.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userDetails = this.userDetailsRepository.create({
      phoneNumber: createUserDetailsDto.phoneNumber,
      address: createUserDetailsDto.address,
      email: createUserDetailsDto.email,
      firstName: createUserDetailsDto.firstName,
      lastName: createUserDetailsDto.lastName,
      user: user,
    });
    return this.userDetailsRepository.save(userDetails);
  }
}
