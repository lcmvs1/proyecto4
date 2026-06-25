"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFuncioneDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_funcione_dto_1 = require("./create-funcione.dto");
class UpdateFuncioneDto extends (0, mapped_types_1.PartialType)(create_funcione_dto_1.CreateFuncioneDto) {
}
exports.UpdateFuncioneDto = UpdateFuncioneDto;
//# sourceMappingURL=update-funcione.dto.js.map