# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- zoom

"""The golden fixtures — the SAME values the TypeScript and PHP packages
assert.

Bit-for-bit identical is the claim, and this is what checks it for Python.
Cross-runtime drift does not fail loudly on its own: it completes, down one
path, with no error.
"""

import pytest

from fancy_zoom._fake import FakeValues, seed_for_call
from fancy_zoom.faker import respond


def test_meeting_get_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("zoom", "meeting_get", config))

    faked = respond("meeting_get", {"config": config, "fake": fake})

    assert faked == {
        "id": "9811075371",
        "uuid": "034dacf2-6ca5-4372-16fc-1db008fa8947",
        "host_id": "u_fake_1fe7dd5e6dc1",
        "topic": "Weekly sync",
        "type": 2,
        "status": "waiting",
        "start_time": "2026-09-22T14:00:00Z",
        "duration": 30,
        "timezone": "America/New_York",
        "agenda": "",
        "join_url": "https://zoom.us/j/1234567890?pwd=fake",
        "password": "798415",
        "settings": {
            "waiting_room": True,
            "join_before_host": False,
            "approval_type": 2,
        },
    }


def test_obf_token_create_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("zoom", "obf_token_create", config))

    faked = respond("obf_token_create", {"config": config, "fake": fake})

    assert faked == {
        "token": "obf_fake_5d85a56fcc2e",
    }


def test_an_operation_with_no_fixture_raises_rather_than_inventing_a_shape() -> None:
    fake = FakeValues(seed_for_call("zoom", "no_such_operation", {}))

    with pytest.raises(ValueError, match="no fake response"):
        respond("no_such_operation", {"config": {}, "fake": fake})
