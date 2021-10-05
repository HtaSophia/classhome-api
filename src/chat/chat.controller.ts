import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ObjectIdTransform } from 'src/shared/types/object-id-helper';
import { ChatService } from './chat.service';
import { AddMessageDto } from './dtos/add-message.dto';
import { CreateChatDto } from './dtos/create-chat.dto';
import { Chat } from './schema/chat.schema';

@Controller('chat')
@UseGuards(JwtGuard, RolesGuard)
export class ChatController {
    constructor(private readonly chatService: ChatService) {}
   
    @Post()
    public async create(@Body() createChatDto: CreateChatDto) : Promise<Chat> {
        return this.chatService.create(
            ObjectIdTransform(createChatDto.noticeId), 
            ObjectIdTransform(createChatDto.owner), 
            createChatDto.message);
    }

    @Put()
    public async addMessage(@Body() addMessageDto: AddMessageDto): Promise<Chat> {
        return this.chatService.addMessage(
            ObjectIdTransform(addMessageDto.chatId),
            ObjectIdTransform(addMessageDto.owner),
            addMessageDto.message
        )
    }

}
