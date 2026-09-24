module.exports = {
  HOST: "ep-dry-dew-at8zfhjq-pooler.c-9.us-east-1.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_JFMobzj8HdD0",
  DB: "neondb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};