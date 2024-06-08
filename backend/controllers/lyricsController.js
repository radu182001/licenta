const pool = require("../database/db");
const queries = require("../queries/lyricsQueries");
const validate = require("../utils/validation");
const axios = require("axios");
const PDFDocument = require("pdfkit");
const { Document, Packer, Paragraph, TextRun } = require("docx");
const fs = require("fs");
const path = require("path");

const updateLyricsPage = async (req, res) => {
  try {
    await pool.query(
      queries.updateLyricsPage(req.params.projectId, req.body.content)
    );
    res.status(201).send({ msg: "Successfully updated!" });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

const getLyrics = async (req, res) => {
  try {
    const content = await pool.query(queries.getLyrics(req.params.projectId));
    res.status(200).send({ content: content.rows[0].content });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

const getSuggestions = async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.datamuse.com/sug?s=${req.query.s}`
    );
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

const getRhymes = async (req, res) => {
  try {
    let { data } = await axios.get(
      `https://api.datamuse.com/words?rel_rhy=${req.query.w}&md=sd`
    );

    if (req.query.syl > 0) {
      data = data.filter((d) => d.numSyllables === parseInt(req.query.syl));
    }

    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

const getSimilarWords = async (req, res) => {
  try {
    let { data } = await axios.get(
      `https://api.datamuse.com/words?ml=${req.query.e}&md=d`
    );

    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

module.exports = {
  getSuggestions,
  getRhymes,
  getSimilarWords,
  getLyrics,
  updateLyricsPage,
};
