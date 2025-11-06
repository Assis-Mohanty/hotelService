import Hotel from './hotel';
import Room from './room';

export function setupAssociations() {
  Hotel.hasMany(Room, {
  foreignKey: 'hotel_id',
  onDelete: 'CASCADE'
});

Room.belongsTo(Hotel, {
  foreignKey: 'hotel_id',
  onDelete: 'CASCADE'
});

}

export { Hotel, Room };
