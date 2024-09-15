import sequelize from './config/database';
import app from './app';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync({ force: false, alter: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
})();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});