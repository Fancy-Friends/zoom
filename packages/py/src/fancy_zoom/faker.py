# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- zoom

"""The Zoom faker.

Bit-for-bit identical to the TypeScript and PHP fakers: the same FNV-1a seed
and the same xorshift32 sequence, so a golden fixture asserts the exact
faked payload and ALL THREE runtimes have to produce it. That turns the
faker into a parity test rather than a convenience — which matters, because
cross-runtime drift does not fail loudly. It completes, down one path, with
no error.
"""

from __future__ import annotations

from typing import Any

from ._fake import FakeValues


def _as_number(value: Any) -> float | None:
    """The coercion an `"as": "integer" | "number"` config binding uses: a value
    that IS a number, never int(float(...))'s uncaught ValueError on one that
    merely looks like text (a text field's auto-generated example, before an
    author has typed a real one).
    """
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _meeting_get(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "id": (
            (int(_n) if (_n := _as_number(_v)) is not None else None)
            if (_v := config.get("meetingId")) is not None and _v != ""
            else "".join(str(fake.int(0, 9)) for _ in range(10))
        ),
        "uuid": "-".join([fake.hex(8), fake.hex(4), fake.hex(4), fake.hex(4), fake.hex(12)]),
        "host_id": fake.id("u"),
        "topic": "Weekly sync",
        "type": 2,
        "status": "waiting",
        "start_time": "2026-09-22T14:00:00Z",
        "duration": 30,
        "timezone": "America/New_York",
        "agenda": "",
        "join_url": "https://zoom.us/j/1234567890?pwd=fake",
        "password": "".join(str(fake.int(0, 9)) for _ in range(6)),
        "settings": {
            "waiting_room": True,
            "join_before_host": False,
            "approval_type": 2,
        },
    }


def _obf_token_create(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "token": fake.id("obf"),
    }


def respond(operation: str, request: dict[str, Any]) -> Any:
    """Dispatch to the fixture for one operation."""
    config: dict[str, Any] = request.get("config") or {}
    fake: FakeValues = request["fake"]

    if operation == "meeting_get":
        return _meeting_get(config, fake)

    if operation == "obf_token_create":
        return _obf_token_create(config, fake)

    # A faker asked for an operation it has no shape for must SAY so. Making
    # something up would produce a green run whose output silently has none of
    # the fields the author is about to reference.
    raise ValueError(
        f'zoom: no fake response is defined for "{operation}". '
        "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker "
        "cannot be developed against, tested, or demonstrated."
    )
