from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.board),
    url(r'^board/$', views.board),
    url(r'^addrecord$', views.addrecord),
    url(r'^getrecords$', views.getrecords),
    url(r'^getmetadata$', views.getmetadata),
    url(r'^gettimetable$', views.gettimetable),
    url(r'^getstatus', views.getstatus),
    url(r'^getaccountdata$', views.getaccountdata),
    url(r'^login/$', views.login_view, name='login'),
    url(r'^logout/$', views.logout_view, name='logout'),
    url(r'^register/$', views.register, name='register'),
    url(r'^user/(\w+)/$', views.profile, name='profile'),
    url(r'^last_userselection/$', views.last_userselection, name='last_userselection'),
    url(r'^newboard/$', views.newboard),
]
