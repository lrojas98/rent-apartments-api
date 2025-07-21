import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyContentDto } from './create-property-content.dto';

export class UpdatePropertyContentDto extends PartialType(CreatePropertyContentDto) {}
