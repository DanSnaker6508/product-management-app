const axios = require("axios");

exports.getExchangeRate = async (req, res) => {
    try {

        const response = await axios.get(
            "https://open.er-api.com/v6/latest/USD"
        );

        res.status(200).json({
            base: response.data.base_code,
            mxnRate: response.data.rates.MXN,
            usdRate: response.data.rates.USD,
            updated: response.data.time_last_update_utc
        });

    } catch (error) {

        res.status(500).json({
            message: "Error al consultar la API externa"
        });

    }
};