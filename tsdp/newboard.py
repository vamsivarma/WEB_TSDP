from subprocess import Popen, PIPE, check_output, STDOUT
import datetime
fulltimestamp=datetime.datetime.now().strftime('%Y%m%d_%H-%M-%S')
scriptPath='/web-tsdp/tsdp/'
with open('logs\recreate_charts'+fulltimestamp+'.txt', 'w') as f:
    with open('logs\recreate_charts_error_'+fulltimestamp+'.txt', 'w') as e:
        #f.flush()
        #e.flush()
        proc = Popen(['python', 'create_performance_charts.py','1'],cwd=scriptPath, stdout=f, stderr=e)
        proc.wait()
        e.flush()
        proc = Popen(['python', 'excel_charts.py','1'],cwd=scriptPath,stdout=f, stderr=e)
        proc.wait()
