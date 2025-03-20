import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Post, UseGuards } from '@nestjs/common';
import { CreatePolicyDto, DeletePolicyDto } from './dto';
import { PermissionService } from './permission.service';
import { RoleGuard } from './role.guard';

@Controller('permission')
@UseGuards(RoleGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  listPolicy() {
    return this.permissionService.listPolicy();
  }

  @Post()
  @HttpCode(204)
  async createPolicy(@Body() payload: CreatePolicyDto) {
    const result = await this.permissionService.createPolicy(payload);

    if (result)
      return;

    throw new BadRequestException();
  }

  @Delete()
  @HttpCode(204)
  async deletePolicy(@Body() payload: DeletePolicyDto) {
    const result = await this.permissionService.deletePolicy(payload);

    if (result)
      return;

    throw new NotFoundException();
  }
}
