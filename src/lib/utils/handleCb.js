export default function makeCallback(controller) {
    return async (req, res) => {
        try {
            const httpRequest = {
                host: req.hostname,
                body: req.body || {},
                query: req.query || {},
                params: req.params || {},
                ip: req.ip,
                method: req.method,
                path: req.path,
                originalUrl: req.originalUrl,
                files: req.files,
                token: req.payload || {},
                headers: {
                    'Content-Type': req.get('Content-Type'),
                    Referer: req.get('referer'),
                    'User-Agent': req.get('User-Agent'),
                },
            };

            const httpResponse = await controller(httpRequest);

            if (httpResponse.headers) {
                res.set(httpResponse.headers);
            }

            return res.status(httpResponse.statusCode).send(httpResponse.body);
        } catch (err) {
            console.log(err)
            return res
                .status(500)
                .send({ error: 'An unknown error occurred', message: err.message });
        }
    };
}
