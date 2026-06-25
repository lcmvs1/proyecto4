"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePeliculaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pelicula_dto_1 = require("./create-pelicula.dto");
class UpdatePeliculaDto extends (0, mapped_types_1.PartialType)(create_pelicula_dto_1.CreatePeliculaDto) {
}
exports.UpdatePeliculaDto = UpdatePeliculaDto;
//# sourceMappingURL=update-pelicula.dto.js.map