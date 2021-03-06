var t = require('assert')
var slugify = require('../')


describe('slugify', () => {

  it('throws', () => {
    try {
      slugify(undefined)
    } catch (err) {
      t.equal(err.message, 'slugify: string argument expected')
    }
  })

  it('replace whitespaces with replacement', () => {
    t.equal(slugify('foo bar baz'), 'foo-bar-baz')
    t.equal(slugify('foo bar baz', '_'), 'foo_bar_baz')
  })

  it('remove duplicates of the replacement character', () => {
    t.equal(slugify('foo , bar'), 'foo-bar')
  })

  it('remove trailing space if any', () => {
    t.equal(slugify(' foo bar baz '), 'foo-bar-baz')
  })

  it('remove not allowed chars', () => {
    t.equal(slugify('foo, bar baz'), 'foo-bar-baz')
    t.equal(slugify('foo- bar baz'), 'foo-bar-baz')
    t.equal(slugify('foo] bar baz'), 'foo-bar-baz')
    t.equal(slugify('foo  bar--baz'), 'foo-bar-baz')
  })

  it('leave allowed chars', () => {
    var allowed = ['*', '+', '~', '.', '(', ')', '\'', '"', '!', ':', '@']
    allowed.forEach((symbol) => {
      t.equal(
        slugify('foo ' + symbol + ' bar baz'),
        'foo-' + symbol + '-bar-baz'
      )
    })
  })

  it('options.replacement', () => {
    t.equal(slugify('foo bar baz', {replacement: '_'}), 'foo_bar_baz')
  })

  it('options.replacement - empty string', () => {
    t.equal(slugify('foo bar baz', {replacement: ''}), 'foobarbaz')
  })

  it('options.remove', () => {
    t.equal(slugify(
      'foo *+~.() bar \'"!:@ baz',
      {remove: /[$*_+~.()'"!\-:@]/g}
    ), 'foo-bar-baz')
  })

  it('options.remove regex without g flag', () => {
    t.equal(slugify(
      'foo bar, bar foo, foo bar',
      {remove: /[^a-zA-Z0-9 -]/}
    ), 'foo-bar-bar-foo-foo-bar')
  })

  it('options.lower', () => {
    t.equal(slugify('Foo bAr baZ', {lower: true}), 'foo-bar-baz')
  })

  it('options.strict', () => {
    t.equal(slugify('foo_bar. -@-baz!', {strict: true}), 'foobar-baz')
  })

  it('options.strict - remove duplicates of the replacement character', () => {
    t.equal(slugify('foo @ bar', {strict: true}), 'foo-bar')
  })

  it('options.replacement and options.strict', () => {
    t.equal(slugify('foo_@_bar-baz!', {
      replacement: '_',
      strict: true
    }), 'foo_barbaz')
  })

  it('replace latin chars', () => {
    var charMap = {
      '??': 'A', '??': 'A', '??': 'A', '??': 'A', '??': 'A', '??': 'A', '??': 'AE',
      '??': 'C', '??': 'E', '??': 'E', '??': 'E', '??': 'E', '??': 'I', '??': 'I',
      '??': 'I', '??': 'I', '??': 'D', '??': 'N', '??': 'O', '??': 'O', '??': 'O',
      '??': 'O', '??': 'O', '??': 'O', '??': 'O', '??': 'U', '??': 'U', '??': 'U',
      '??': 'U', '??': 'U', '??': 'Y', '??': 'TH', '??': 'ss', '??': 'a', '??': 'a',
      '??': 'a', '??': 'a', '??': 'a', '??': 'a', '??': 'ae', '??': 'c', '??': 'e',
      '??': 'e', '??': 'e', '??': 'e', '??': 'i', '??': 'i', '??': 'i', '??': 'i',
      '??': 'd', '??': 'n', '??': 'o', '??': 'o', '??': 'o', '??': 'o', '??': 'o',
      '??': 'o', '??': 'o', '??': 'u', '??': 'u', '??': 'u', '??': 'u', '??': 'u',
      '??': 'y', '??': 'th', '??': 'y', '???': 'SS'
    }
    for (var ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace greek chars', () => {
    var charMap = {
      '??': 'a', '??': 'b', '??': 'g', '??': 'd', '??': 'e', '??': 'z', '??': 'h', '??': '8',
      '??': 'i', '??': 'k', '??': 'l', '??': 'm', '??': 'n', '??': '3', '??': 'o', '??': 'p',
      '??': 'r', '??': 's', '??': 't', '??': 'y', '??': 'f', '??': 'x', '??': 'ps', '??': 'w',
      '??': 'a', '??': 'e', '??': 'i', '??': 'o', '??': 'y', '??': 'h', '??': 'w', '??': 's',
      '??': 'i', '??': 'y', '??': 'y', '??': 'i',
      '??': 'A', '??': 'B', '??': 'G', '??': 'D', '??': 'E', '??': 'Z', '??': 'H', '??': '8',
      '??': 'I', '??': 'K', '??': 'L', '??': 'M', '??': 'N', '??': '3', '??': 'O', '??': 'P',
      '??': 'R', '??': 'S', '??': 'T', '??': 'Y', '??': 'F', '??': 'X', '??': 'PS', '??': 'W',
      '??': 'A', '??': 'E', '??': 'I', '??': 'O', '??': 'Y', '??': 'H', '??': 'W', '??': 'I',
      '??': 'Y'
    }
    for (var ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace turkish chars', () => {
    var charMap = {
      '??': 's', '??': 'S', '??': 'i', '??': 'I', '??': 'c', '??': 'C', '??': 'u', '??': 'U',
      '??': 'o', '??': 'O', '??': 'g', '??': 'G'
    }
    for (var ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace cyrillic chars', () => {
    var charMap = {
      '??': 'a', '??': 'b', '??': 'v', '??': 'g', '??': 'd', '??': 'e', '??': 'yo', '??': 'zh',
      '??': 'z', '??': 'i', '??': 'j', '??': 'k', '??': 'l', '??': 'm', '??': 'n', '??': 'o',
      '??': 'p', '??': 'r', '??': 's', '??': 't', '??': 'u', '??': 'f', '??': 'h', '??': 'c',
      '??': 'ch', '??': 'sh', '??': 'sh', '??': 'u', '??': 'y', '??': '', '??': 'e', '??': 'yu',
      '??': 'ya',
      '??': 'A', '??': 'B', '??': 'V', '??': 'G', '??': 'D', '??': 'E', '??': 'Yo', '??': 'Zh',
      '??': 'Z', '??': 'I', '??': 'J', '??': 'K', '??': 'L', '??': 'M', '??': 'N', '??': 'O',
      '??': 'P', '??': 'R', '??': 'S', '??': 'T', '??': 'U', '??': 'F', '??': 'H', '??': 'C',
      '??': 'Ch', '??': 'Sh', '??': 'Sh', '??': 'U', '??': 'Y', '??': '', '??': 'E', '??': 'Yu',
      '??': 'Ya', '??': 'Ye', '??': 'I', '??': 'Yi', '??': 'G', '??': 'ye', '??': 'i',
      '??': 'yi', '??': 'g'
    }
    for (var ch in charMap) {
      var expected = 'foo-' + charMap[ch] + '-bar-baz'
      if (!charMap[ch]) {
        expected = 'foo-bar-baz'
      }
      t.equal(slugify('foo ' + ch + ' bar baz'), expected)
    }
  })

  it('replace kazakh cyrillic chars', () => {
    var charMap = {
      '??': 'AE', '??': 'ae', '??': 'GH', '??': 'gh', '??': 'KH', '??': 'kh', '??': 'NG', '??': 'ng',
      '??': 'UE', '??': 'ue', '??': 'U', '??': 'u', '??': 'H', '??': 'h', '??': 'OE', '??': 'oe'
    }
    for (var ch in charMap) {
      var expected = 'foo-' + charMap[ch] + '-bar-baz'
      if (!charMap[ch]) {
        expected = 'foo-bar-baz'
      }
      t.equal(slugify('foo ' + ch + ' bar baz'), expected)
    }
  })

  it('replace czech chars', () => {
    var charMap = {
      '??': 'c', '??': 'd', '??': 'e', '??': 'n', '??': 'r', '??': 's', '??': 't', '??': 'u',
      '??': 'z', '??': 'C', '??': 'D', '??': 'E', '??': 'N', '??': 'R', '??': 'S', '??': 'T',
      '??': 'U', '??': 'Z'
    }
    for (var ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace polish chars', () => {
    var charMap = {
      '??': 'a', '??': 'c', '??': 'e', '??': 'l', '??': 'n', '??': 'o', '??': 's', '??': 'z',
      '??': 'z', '??': 'A', '??': 'C', '??': 'e', '??': 'L', '??': 'N', '??': 'S',
      '??': 'Z', '??': 'Z'
    }
    for (var ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace latvian chars', () => {
    var charMap = {
      '??': 'a', '??': 'c', '??': 'e', '??': 'g', '??': 'i', '??': 'k', '??': 'l', '??': 'n',
      '??': 's', '??': 'u', '??': 'z', '??': 'A', '??': 'C', '??': 'E', '??': 'G', '??': 'i',
      '??': 'k', '??': 'L', '??': 'N', '??': 'S', '??': 'u', '??': 'Z'
    }
    for (var ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace serbian chars', () => {
    var charMap = {
      '??': 'dj', '??': 'nj', '??': 'lj', '??': 'DJ', '??': 'NJ', '??': 'LJ', '??': 'dj', '??': 'j',
      '??': 'lj', '??': 'nj', '??': 'c', '??': 'dz', '??': 'DJ', '??': 'J', '??': 'LJ', '??': 'NJ',
      '??': 'C', '??': 'DZ'
    }
    for (var ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace currencies', () => {
    var charMap = {
      '???': 'euro', '???': 'cruzeiro', '???': 'french franc', '??': 'pound',
      '???': 'lira', '???': 'mill', '???': 'naira', '???': 'peseta', '???': 'rupee',
      '???': 'won', '???': 'new shequel', '???': 'dong', '???': 'kip', '???': 'tugrik', '???': 'kazakhstani tenge',
      '???': 'drachma', '???': 'penny', '???': 'peso', '???': 'guarani', '???': 'austral',
      '???': 'hryvnia', '???': 'cedi', '??': 'cent', '??': 'yen', '???': 'yuan',
      '???': 'yen', '???': 'rial', '???': 'ecu', '??': 'currency', '???': 'baht',
      '$': 'dollar', '???': 'russian ruble', '???': 'bitcoin', "???": "turkish lira"
    }
    for (var ch in charMap) {
      charMap[ch] = charMap[ch].replace(' ', '-')
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace symbols', () => {
    var charMap = {
      '??': '(c)', '??': 'oe', '??': 'OE', '???': 'sum', '??': '(r)', '???': '+',
      '???': '"', '???': '"', '???': "'", '???': "'", '???': 'd', '??': 'f', '???': 'tm',
      '???': 'sm', '???': '...', '??': 'o', '??': 'o', '??': 'a', '???': '*',
      '???': 'delta', '???': 'infinity', '???': 'love', '&': 'and', '|': 'or',
      '<': 'less', '>': 'greater'
    }
    for (var ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace custom characters', () => {
    slugify.extend({'???': 'radioactive'})
    t.equal(slugify('unicode ??? is ???'), 'unicode-love-is-radioactive')

    delete require.cache[require.resolve('../')]
    slugify = require('../')

    t.equal(slugify('unicode ??? is ???'), 'unicode-love-is')
  })

  it('normalize', () => {
    var slug = decodeURIComponent('a%CC%8Aa%CC%88o%CC%88-123') // ??????-123
    t.equal(slugify(slug, {remove: /[*+~.()'"!:@]/g}), 'aao-123')
  })

})
