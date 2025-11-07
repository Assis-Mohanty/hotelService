import Hotel from './hotel';
import RoomCategory from './roomCategory';

export function setupAssociations() {
  Hotel.hasMany(RoomCategory, {
  foreignKey: 'hotel_id',
  onDelete: 'CASCADE'
});

RoomCategory.belongsTo(Hotel, {
  foreignKey: 'hotel_id',
  onDelete: 'CASCADE'
});

}

export { Hotel, RoomCategory };
