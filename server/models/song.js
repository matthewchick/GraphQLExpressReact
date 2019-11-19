const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// https://itnext.io/graphql-mongoose-a-design-first-approach-d97b7f0c869
const SongSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  lyrics: [{
    type: Schema.Types.ObjectId,
    ref: 'lyric'
  }]
});

// https://mongoosejs.com/docs/guide.html
// Do not declare statics using ES6 arrow functions (=>).
// Promise.all https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
SongSchema.statics.addLyric = function(id, content) {
  const Lyric = mongoose.model('lyric');

  return this.findById(id)
    .then(song => {
      const lyric = new Lyric({ content, song })
      song.lyrics.push(lyric)
      return Promise.all([lyric.save(), song.save()])
        .then(([lyric, song]) => song);
    });
}

// populate() needs a query to attach itself to, so we are using User.findOne() 
// to find a user who matches the username we provide in the argument. 
SongSchema.statics.findLyrics = function(id) {
  return this.findById(id)
    .populate('lyrics')
    .then(song => song.lyrics);
}

mongoose.model('song', SongSchema);
