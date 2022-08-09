# Basic Architecture

What should be considered?

- Reliability (no single point of failure)
  - Disaster Recovery (DR)
  - Handling increased demand
  - Mitigating disruption
- Performance efficiency
  - Deliver resources fast
- Security
- Cost optimization (🤑)

# Reliability (no single point of failure)

- Disaster Recovery (DR)
- Handling increased demand
- Mitigating disruption

## Disaster Recovery (DR)

Choose recovery strategies based on RPO and RTO:

- Recovery Point Objective (RPO): the acceptable amount of data loss measured in time.
- Recovery Time Objective (RTO): the time it takes after a disruption to restore a business process to its service level, as defined by the operational level agreement (OLA).

### Backup

1. Duplicate your storage

   - S3
   - EBS
   - EFS

2. Amazon Machine Images (AMIs)

   - snapshot your hardware configuration

3. Failure network design

   - Route 53
   - ELB

4. Database backup and replicas

   - Multi-AZ DB cluster deployment (standby instances & read replicas)
   - Global tables provide a fully managed, multi-Region, and multi-active database that replicates your DynamoDB tables

5. Template and scripts

   - Use CloudFormation to define your infrastructure and deploy it consistently across AWS accounts and Regions

### Recovery strategies

1. Backup and restore

   It can take a long time to restore your system in the event of a disruption.

2. Pilot light

   Always on: databases, object storage
   Switch off: application servers

   When disaster strikes, the servers in the recovery environment start up and then Route 53 begins sending production traffic to the recovery environment.

3. Fully working low-capacity standby

   This solution is not scaled to take a full production load, but it is fully functional.

   If the production environment is unavailable, Route 53 switches over to the recovery environment. The recovery environment automatically scales its capacity out in the event of a failover from the primary system.

4. Multi-site active/active

   Both Production A and Production B environments run web servers, app servers, and databases to handle production traffic. Route 53 routes traffic between the two environments.

## Auto scaling (scale out and scale in)

First, configure your scaling plan defined in Amazon EC2 Auto Scaling.

- Aggressively scale out
- Conservatively scale in

Traffic in: Elastic Load Balancing (ELB) -> Auto scaling groups

When to scale? ELB ---- logs ---> CloudWatch ---- alarms ---> Auto scaling groups

# Performance efficiency

## CDN

CDN like CloudFront can cache your resources at edge locations.

- Static resources: TTL 3600
- Dynamic resources: TTL 0 (It's still faster even it doesn't cache)

## Routing Policy

Can choose `Geolocation routing policy` and `Latency routing policy`

- Geolocation routing policy – Use when you want to route traffic based on the location of your users.
- Latency routing policy – Use when you have resources in multiple AWS Regions and you want to route traffic to the Region that provides the lowest latency with less round-trip time.

# Security

- Virtual Private Cloud (VPC) - lets you launch AWS resources in a logically isolated virtual network that you define.
- Subnets
  - Public subnets - connected to internet gateway which is the only way to go to the internet
  - Private subnets - need to use NAT gateways if the instances inside private subnets want to go to the internet
- Route table - set the routing destinations and targets such as routing all IPv4 internet traffic to NAT gateways
- Network access control lists (NACL) - an optional layer of security for your VPC that acts as a firewall for controlling traffic in and out of one or more subnets
- Security groups - acts as a virtual firewall for your instance to control inbound and outbound traffic
- Security group chaining - 0.0.0.0 (anywhere) -> Web security group(allow 443) -> App security group(allow 80) -> Data security group(allow 3306)
