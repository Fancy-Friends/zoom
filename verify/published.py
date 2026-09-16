"""
Zoom — the published PyPI wheel.

GENERATED — do not edit. Fix weaver's template/ and regenerate.

Runs against the PUBLISHED wheel, installed by name into a fresh venv.
Every other test here imports from ../src and cannot see the packaging —
a missing py.typed or an unshipped module passes there and breaks for
every user.
"""

from importlib.metadata import requires

from fancy_zoom._fake import FakeValues, seed_for_call
from fancy_zoom.faker import respond

GOLDENS = [
    {
        "operation": "meeting_get",
        "config": {},
        "expected": {
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
        },
    },
    {
        "operation": "obf_token_create",
        "config": {},
        "expected": {
            "token": "obf_fake_5d85a56fcc2e",
        },
    },
]


def main() -> None:
    # Zero runtime dependencies is a design constraint, checked on the
    # INSTALLED distribution rather than on the pyproject that claimed it.
    declared = requires("fancy-zoom")
    assert not declared, f"expected no runtime dependencies, got {declared}"
    print("  ok   zero runtime dependencies on the installed distribution")

    for golden in GOLDENS:
        operation, config = golden["operation"], golden["config"]
        fake = FakeValues(seed_for_call("zoom", operation, config))
        faked = respond(operation, {"config": config, "fake": fake})

        assert faked == golden["expected"], (
            f"the PUBLISHED wheel produced different bytes for {operation} than the repo does"
        )
        print(f"  ok   {operation}")

    print(f"\n  {len(GOLDENS)} operations verified against the published wheel.")


if __name__ == "__main__":
    main()
