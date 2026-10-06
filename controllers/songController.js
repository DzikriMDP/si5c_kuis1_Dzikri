const songModel = require("../models/songModel");
const { errorHttp } = require("../middlewares/errorHandler");

exports.getAll = (req, res) => {
  const { artis } = req.query;

  res.json(songModel.getAll(artis));
};

exports.getById = (req, res, next) => {
  const id = Number(req.params.id);
  const song = songModel.getById(id);

  if (!song) {
    return next(
      errorHttp(404, `Lagu dengan id ${id} tidak ditemukan`)
    );
  }

  res.json(song);
};

function validateSong(data) {
  const {
    judul,
    artis,
    album,
    tahunRilis,
    durasiDetik
  } = data;

  if (!judul || !artis || tahunRilis === undefined) {
    return "judul, artis, dan tahunRilis wajib diisi";
  }

  if (typeof judul !== "string" || typeof artis !== "string") {
    return "judul dan artis harus berupa teks";
  }

  if (typeof tahunRilis !== "number") {
    return "tahunRilis harus berupa angka";
  }

  if (album !== undefined && typeof album !== "string") {
    return "album harus berupa teks";
  }

  if (
    durasiDetik !== undefined &&
    typeof durasiDetik !== "number"
  ) {
    return "durasiDetik harus berupa angka";
  }

  return null;
}

exports.create = (req, res, next) => {
  const validationError = validateSong(req.body);

  if (validationError) {
    return next(errorHttp(400, validationError));
  }

  const {
    judul,
    artis,
    album,
    tahunRilis,
    durasiDetik
  } = req.body;

  const newSong = songModel.create({
    judul,
    artis,
    album,
    tahunRilis,
    durasiDetik
  });

  res.status(201).json({
    status: "success",
    message: "Lagu berhasil ditambahkan",
    data: newSong
  });
};

exports.update = (req, res, next) => {
  const id = Number(req.params.id);
  const song = songModel.getById(id);

  if (!song) {
    return next(
      errorHttp(404, `Lagu dengan id ${id} tidak ditemukan`)
    );
  }

  const validationError = validateSong(req.body);

  if (validationError) {
    return next(errorHttp(400, validationError));
  }

  const {
    judul,
    artis,
    album,
    tahunRilis,
    durasiDetik
  } = req.body;

  const updatedSong = songModel.update(id, {
    judul,
    artis,
    album,
    tahunRilis,
    durasiDetik
  });

  res.status(200).json({
    status: "success",
    message: "Lagu berhasil diperbarui",
    data: updatedSong
  });
};

exports.remove = (req, res, next) => {
  const id = Number(req.params.id);
  const berhasil = songModel.remove(id);

  if (!berhasil) {
    return next(
      errorHttp(404, `Lagu dengan id ${id} tidak ditemukan`)
    );
  }

  res.status(200).json({
    status: "success",
    message: `Lagu dengan id ${id} berhasil dihapus`,
    data: null
  });
};