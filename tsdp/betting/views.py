from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .models import UserSelection
from .helpers import *
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
import sqlite3
import json
from os.path import isfile, join

dbPath = 'db.sqlite3'
readConn = sqlite3.connect(dbPath)


# Create your views here.
#def refreshMetaData(request):
#    updateMeta = MetaData(mcdate=MCdate(), timestamp=getTimeStamp())
#    updateMeta.save()
#from django.views.decorators.csrf import csrf_exempt

#@csrf_exempt
def addrecord(request):
    
    list_boxstyles = json.loads(request.POST.get('boxstyles'))
    
    if list_boxstyles != []:
        cloc= json.loads(request.POST.get("componentloc"))
        #print cloc
        ##create new boxstyles json
        votingComponents=get_blends(cloc, list_boxstyles=list_boxstyles)
    else:
        cloc = eval(UserSelection.objects.order_by('-timestamp').first().dic()['componentloc'])
        #print cloc, list_boxstyles
        votingComponents=get_blends(cloc)

    record = UserSelection(userID=request.POST.get('user_id', 32), selection=request.POST.get('Selection', '{}'), \
                            v4futures=json.dumps(votingComponents), v4mini=json.dumps(votingComponents), \
                            v4micro=json.dumps(votingComponents),
                            componentloc = json.dumps(cloc),
                            #boxstyles = json_boxstyles,
                            #performance = json_performance,
                            mcdate=MCdate(), timestamp=getTimeStamp())
    record.save()
    return HttpResponse(json.dumps({"id": record.id}))


def getrecords(request):
    # records = [ dict((cn, getattr(data, cn)) for cn in ('v4futures', 'v4mini')) for data in UserSelection.objects.all() ]
    # print(records)
    # return HttpResponse(json.dumps(records))

    firstrec = UserSelection.objects.order_by('-timestamp').first()
    if firstrec == None:
        record = UserSelection(userID=json.dumps(UserSelection.default_userid),
                               selection=json.dumps(UserSelection.default_selection),
                               v4futures=json.dumps(UserSelection.default_jsonboard),
                               v4mini=json.dumps(UserSelection.default_jsonboard),
                               v4micro=json.dumps(UserSelection.default_jsonboard),
                               componentloc=json.dumps(UserSelection.default_cloc),
                               mcdate=MCdate(),
                               timestamp=getTimeStamp(), )
        record.save()
        firstrec = UserSelection.objects.order_by('-timestamp').first()

    filename = 'performance_data.json'
    if isfile(filename):
        with open(filename, 'r') as f:
            json_performance = json.load(f)
    else:
        list_performance = []
        with open(filename, 'w') as f:
            json.dump(list_performance, f)
        print('Saved', filename)

    filename = 'boxstyles_data.json'
    if isfile(filename):
        with open(filename, 'r') as f:
            json_boxstyles = json.load(f)
    else:
        with open(filename, 'w') as f:
            json.dump(UserSelection.default_list_boxstyles, f)
        print('Saved', filename)

    filename = 'customboard_data.json'
    if isfile(filename):
        with open(filename, 'r') as f:
            json_customstyles = json.load(f)
    else:
        with open(filename, 'w') as f:
            json.dump(UserSelection.default_list_customboard, f)
        print('Saved', filename)

    firstdata = firstrec.dic()
    firstdata['performance'] = json_performance
    firstdata['boxstyles'] = json_boxstyles
    firstdata['customstyles'] = json_customstyles
    # print(json.dumps(firstdata))
    recent = UserSelection.objects.order_by('-timestamp')[:20]
    recentdata = [dict((cn, getattr(data, cn)) for cn in ('timestamp', 'mcdate', 'selection')) for data in recent]

    return HttpResponse(json.dumps({"first": firstdata, "recent": recentdata}))


def board(request):
    selections = UserSelection.objects.all().order_by('-timestamp')

    # Please wait up to five minutes for immediate orders to be processed.
    if 'True' in [order[1] for sys, order in eval(selections[0].selection).items()]:
        print('Immediate Orders found')
        checkImmediateOrders()

    # Please wait 10-15 minutes for the charts to be recreated.
    if selections[0].dic()['componentloc']!=selections[1].dic()['componentloc']:
        print('New Board config found')
        recreateCharts()

    updateMeta()
    getAccountValues()

    return render(request, 'index.html', {})

def newboard(request):
    return render(request, 'newboard.html', {})

def getmetadata(request):
    #returnrec = MetaData.objects.order_by('-timestamp').first()
    #returndata = returnrec.dic()
    returndata=updateMeta()
    print(returndata)
    return HttpResponse(json.dumps(returndata))

def getaccountdata(request):
    returnrec = AccountData.objects.order_by('-timestamp').first()
    returndata = returnrec.dic()
    print(returndata)
    return HttpResponse(json.dumps(returndata))

def gettimetable(request):
    returndata = get_timetables()
    print(returndata)
    return HttpResponse(json.dumps(returndata))

def getstatus(request):
    returndata = get_status()
    print(returndata)
    return HttpResponse(json.dumps(returndata))

def profile(request, username):
    user = User.objects.get(username=username)
    return render(request, 'profile.html', {'username': username})


def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            u = form.cleaned_data['username']
            p = form.cleaned_data['password']
            user = authenticate(username=u, password=p)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponseRedirect('/')
                else:
                    print('The account has been disabled.')
                    return HttpResponseRedirect('/')
            else:
                print('The username and password were incorrect.')
                return HttpResponseRedirect('/')


    else:
        form = LoginForm()
        return render(request, 'login.html', {'form': form})


def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/')


def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/login/')
    else:
        form = UserCreationForm()
        return render(request, 'registration.html', {'form': form})


def last_userselection(request):
    #lastSelection = pd.read_sql('select * from betting_userselection where timestamp=\
    #        (select max(timestamp) from betting_userselection as maxtimestamp)', con=readConn, index_col='userID')
    lastSelection=UserSelection.objects.all().order_by('-timestamp')[0]
    return JsonResponse(lastSelection.dic())
