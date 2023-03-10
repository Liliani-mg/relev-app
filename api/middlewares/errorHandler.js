module.exports = (err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development";
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  };
  