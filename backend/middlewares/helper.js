exports.parseData = (req, res, next) => {
    const { trailer, cast, gendes, tags, writers } = req.body;
    if (trailer) req.body.trailer = JSON.parse(trailer);
    if (cast) req.body.cast = JSON.parse(cast);
    if (gendes) req.body.gendes = JSON.parse(gendes);
    if (tags) req.body.tags = JSON.parse(tags);
    if (writers) req.body.writers = JSON.parse(writers);

    next();
}