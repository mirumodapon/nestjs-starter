import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseFilters, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/permission/role.guard';
import { CreateUserDto, ListUserDto, UpdateUserDto } from './dto';
import { UserException } from './user.exception';
import { UserService } from './user.service';

@Controller('user')
@UseFilters(UserException)
@UseGuards(RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Get()
  listUser(@Query() payload: ListUserDto) {
    return this.userService.listUser(payload);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto
  ) {
    return this.userService.updateUser(id, payload);
  }

  @Delete(':id')
  deleteUser(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.deleteUser(id);
  }

  // TODO: update or delete multi-user
}
