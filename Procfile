web: gunicorn thing.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: REMAP_SIGTERM=SIGQUIT celery --workdir backend --app=thing worker --loglevel=info
beat: REMAP_SIGTERM=SIGQUIT celery --workdir backend --app=thing beat -S redbeat.RedBeatScheduler --loglevel=info
