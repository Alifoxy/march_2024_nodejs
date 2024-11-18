import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ArticlesService } from './services/articles.service';
import { CreateArticleDto } from './models/dto/req/create-article.dto';
import { UpdateArticleDto } from './models/dto/req/update-article.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { ArticleResDto } from './models/dto/res/article.res.dto';
import { ArticlesMapper } from './services/articles.mapper';
import { ArticleID } from '../../common/types/entity-ids.type';
import { ListArticleQueryDto } from './models/dto/req/list-article-query.dto';
import { ArticleListResDto } from './models/dto/res/article-list.res.dto';

@ApiBearerAuth()
@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateArticleDto,
  ): Promise<ArticleResDto> {
    const result = await this.articleService.create(userData, dto);
    return ArticlesMapper.toResDto(result);
  }

  @Get()
  public async findAll(
    @CurrentUser() userData: IUserData,
    @Query() query: ListArticleQueryDto,
  ): Promise<ArticleListResDto> {
    const [entities, total] = await this.articleService.findAll(
      userData,
      query,
    );
    return ArticlesMapper.toResDtoList(entities, total, query);
  }

  @Get(':articleId')
  public async findOne(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
  ): Promise<ArticleResDto> {
    const result = await this.articleService.findOne(userData, articleId);
    return ArticlesMapper.toResDto(result);
  }

  @Patch(':articleId')
  public async update(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
    @Body() dto: UpdateArticleDto,
  ): Promise<ArticleResDto> {
    const result = await this.articleService.update(userData, articleId, dto);
    return ArticlesMapper.toResDto(result);
  }

  @Post(':articleId/like')
  public async like(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
  ): Promise<void> {
    await this.articleService.like(userData, articleId);
  }

  @Delete(':articleId/like')
  public async unlike(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
  ): Promise<void> {
    await this.articleService.unlike(userData, articleId);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateArticleDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
