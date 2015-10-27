// sendEval, getEval, uiEval

//AppInventor.sendEval('(reset-current-form-environment)');//("(clear-current-form)");
AppInventor.getEval("(require <com.google.youngandroid.runtime>)");
AppInventor.sendEval("(require <com.google.youngandroid.runtime>)");
AppInventor.sendEval('(((WebViewer1:getView):getParent):removeView (WebViewer1:getView))');
AppInventor.sendEval('((as com.google.appinventor.components.runtime.ComponentContainer\
   (lookup-in-current-form-environment \'Screen1)):$add\
    (as com.google.appinventor.components.runtime.AndroidViewComponent WebViewer1))');
AppInventor.sendEval('(((WebViewer1:getView):getClass):setWebContentsDebuggingEnabled #t)');
