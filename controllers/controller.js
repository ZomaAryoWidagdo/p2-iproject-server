"use strict";

const axios = require("axios");
const { getCurrentTimestamp, snap } = require("../helpers/Midtrans");

class Controller {
  static getChart(req, res, next) {
    const options = {
      method: "GET",
      url: "https://billboard2.p.rapidapi.com/billboard_global_200",
      params: { date: "2022-04-17" },
      headers: {
        "X-RapidAPI-Host": process.env.HOST_CHART,
        "X-RapidAPI-Key": "2202f4129amsh3db77d9573b4d9cp1bea67jsnadca2d22401c",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data.slice(0, 25);

        res.status(200).json({
          data,
        });
      })
      .catch(function (error) {
        next(error);
      });
  }

  static searchSong(req, res, next) {
    let { name } = req.params;
    const options = {
      method: "GET",
      url: `https://lyrics-finder1.p.rapidapi.com/artists/${name}`,
      headers: {
        "X-RapidAPI-Host": process.env.SEARCH_KEY,
        "X-RapidAPI-Key": process.env.KEY_CHART,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data.slice(0);

        res.status(200).json({
          data,
        });
      })
      .catch(function (error) {
        next(error);
      });
  }

  static getLyrics(req, res, next) {
    let { name, title } = req.params;

    title = title.split(" ").join("-").toLowerCase();
    console.log(title, name);
    const options = {
      method: "GET",
      url: `https://lyrics-finder1.p.rapidapi.com/${name}/${title}`,
      headers: {
        "X-RapidAPI-Host": process.env.SEARCH_KEY,
        "X-RapidAPI-Key": process.env.KEY_CHART,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const data = response.data;

        res.status(200).json({
          data,
        });
      })
      .catch(function (error) {
        next(error);
      });
  }

  static async midTrans(req, res, next) {
    try {
      const { email, amount } = req.body;
      let id = "donate-" + getCurrentTimestamp();

      let parameter = {
        transaction_details: {
          order_id: id,
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: email,
        },
      };

      let donation = await snap.createTransaction(parameter);

      let token = donation.token;

      let redirect_url = donation.redirect_url;

      res.status(200).json({
        token,
        redirect_url,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
