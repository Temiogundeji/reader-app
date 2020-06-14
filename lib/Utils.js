const statusCode = null;
const type = null;
const data = null;
const message = null;

module.exports = {

    setSuccess: (status_code, msg, d) => {
        statusCode = status_code;
        message = msg;
        data = d;
        type = 'success';
    },

    setError:  (status_code, msg) => {
        statusCode = status_code;
        message = msg;
        type = 'error';
    },

    send: (res) => {
        const result = {
            status: type,
            message: message,
            data:data
        }

        if(type === 'success') {
            return res.status(statusCode).json(result);
        }

        return res.status(statusCode).json({
            status: type,
            message: message
        })
    }
}

