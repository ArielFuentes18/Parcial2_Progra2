module.exports = {
  HOST: "ep-silent-pond-at3a1kye-pooler.c-9.us-east-1.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_JXxsCk7FB0Qm",
  DB: "neondb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};