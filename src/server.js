import app from './app';

function normalizaPort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

const port = normalizaPort(process.env.PORT || '4444');

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
