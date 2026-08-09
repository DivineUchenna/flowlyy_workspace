# clients

One subfolder per client. Config, conversation log, automations
deployed, status.

Create a client only once they've paid — prospects and open
conversations live in `prospects` and the Notion outreach tracker
until then. Each client subfolder should track:
- config (credentials pointer, systems connected, cert types tracked)
- conversation log
- which automations from `automations/` are live for them
- current status (setup, live, at-risk, churned)
