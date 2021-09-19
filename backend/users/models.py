from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import ugettext_lazy as _

from common.models import IndexedTimeStampedModel

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin, IndexedTimeStampedModel):
    email = models.EmailField(max_length=255, unique=True)
    firstname = models.CharField(max_length=20, default='')
    lastname = models.CharField(max_length=20, default='')
    is_teacher = models.BooleanField(
        default=False, help_text=_("Select this when user is a teacher"))
    is_staff = models.BooleanField(
        default=False, help_text=_("Designates whether the user can log into this admin " "site.")
    )
    is_active = models.BooleanField(
        default=True,
        help_text=_(
            "Designates whether this user should be treated as "
            "active. Unselect this instead of deleting accounts."
        ),
    )

    objects = UserManager()

    USERNAME_FIELD = "email"

    def get_full_name(self):
        return f"{self.lastname} {self.firstname}"

    def get_short_name(self):
        return self.email

    def __str__(self):
        return self.email
