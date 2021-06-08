const tinify = require("tinify");
tinify.key = "HyBpgRkgd4gsY3VbvS8HJxjd8Qs9ksjv";


//tinify.proxy = "http://user:pass@192.168.0.1:8080";

const source = tinify.fromUrl("http://i3.ytimg.com/vi/0UajEoSKBTs/maxresdefault.jpg");
source.toFile("optimized.jpg");