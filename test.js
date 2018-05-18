/*
const http = require('http');
let home_url  = '/iTracker/';
const path = require('path');
const fs = require('fs');
const express = require('express');
const routes = require('./routes/index');
const hub = require('./hub');
const app = express();
app.use(express.json());
app.use(express.static('public'));*/
//load modules
import http from 'http';
let homeUrl  = '/iTracker/';
import path from 'path';
import fs from 'fs';
import express from 'express';
import routes from './route/index';
import {getusers,getUserRequest} from './hub';
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get(`${homeUrl}api/v1/users`, (req, res) => getusers(req, res));
app.get(`${homeUrl}api/v1/users:id/requests`, (req, res) => getUserRequest(req, res));


export default app;