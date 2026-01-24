import Hotel from './hotel';
import Room from './room';
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

Room.belongsTo(Hotel,{
  foreignKey:'hotel_id',
  onDelete:'CASCADE'
});

Hotel.hasMany(Room,{
  foreignKey:'hotel_id',
  onDelete:'CASCADE'
});

Room.belongsTo(RoomCategory,{
  foreignKey:'room_category_id',
  onDelete:'CASCADE'
})
RoomCategory.hasMany(Room,{
  foreignKey:'room_category_id',
  onDelete:'CASCADE'
})
}

export { Hotel, RoomCategory,Room };
