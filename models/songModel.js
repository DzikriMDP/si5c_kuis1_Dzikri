let songs = [
  {
    id: 1,
    judul: "Langit Jingga",
    artis: "Senandung",
    album: "Sore di Kota",
    tahunRilis: 2024,
    durasiDetik: 214
  },
  {
    id: 2,
    judul: "Malam Berdua",
    artis: "Senandung",
    album: "Cerita Malam",
    tahunRilis: 2023,
    durasiDetik: 198
  },
  {
    id: 3,
    judul: "Pulang",
    artis: "Ruang Senja",
    album: "Perjalanan",
    tahunRilis: 2022,
    durasiDetik: 245
  }
];

let nextId = 4;

function getAll(artis) {
  if (artis) {
    return songs.filter(
      (song) => song.artis.toLowerCase() === artis.toLowerCase()
    );
  }

  return songs;
}

function getById(id) {
  return songs.find((song) => song.id === id);
}

function create(data) {
  const newSong = {
    id: nextId++,
    ...data
  };

  songs.push(newSong);
  return newSong;
}

function update(id, data) {
  const index = songs.findIndex((song) => song.id === id);

  if (index === -1) {
    return null;
  }

  songs[index] = {
    ...songs[index],
    ...data,
    id
  };

  return songs[index];
}

function remove(id) {
  const index = songs.findIndex((song) => song.id === id);

  if (index === -1) {
    return false;
  }

  songs.splice(index, 1);
  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};