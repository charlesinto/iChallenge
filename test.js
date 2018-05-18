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
import apiVersion from './src/ap1.js'
import fs from 'fs';
import express from 'express';
//import routes from './route/index';
import {getusers,getUserRequest, getUserByRequestId,postRequest} from './src/hub';
const app = express();
app.use('/v1',apiVersion);
app.use(express.json());
app.use(express.static('public'));
export default app;