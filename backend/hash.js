const bcrypt = require('bcryptjs');

bcrypt.hash('admin123', 10, (err, hash) => {
  console.log('Hashed password:', hash);
});
