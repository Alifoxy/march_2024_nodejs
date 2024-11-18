import { forwardRef, Module } from '@nestjs/common';

import { ArticlesModule } from '../articles/articles.module';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => ArticlesModule), AuthModule, FileStorageModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
