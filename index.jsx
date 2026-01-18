import React, { useState } from "react";
import { CheckCircle, XCircle, Award, RefreshCw } from "lucide-react";

const CloudComputingQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    // Docker Questions (1-25)
    {
      question: "What programming language is Docker written in?",
      options: ["Python", "Java", "Go", "C++"],
      correct: 2,
      explanation: "Docker is written in the Go (Golang) programming language.",
    },
    {
      question:
        "What technology does Docker use to provide isolated workspace?",
      options: ["Hypervisor", "Namespaces", "Virtual Machines", "Containers"],
      correct: 1,
      explanation:
        "Docker uses namespaces technology to provide isolated workspace called containers.",
    },
    {
      question: "What is a Docker Container?",
      options: [
        "A virtual machine",
        "An executable, lightweight package with all dependencies",
        "A cloud storage service",
        "A network protocol",
      ],
      correct: 1,
      explanation:
        "A container is an executable, lightweight package that contains everything needed to run an application with all necessary dependencies and configurations.",
    },
    {
      question: "What is Docker Hub?",
      options: [
        "A container runtime",
        "A repository for sharing container images",
        "A monitoring tool",
        "An orchestration platform",
      ],
      correct: 1,
      explanation:
        "Docker Hub is a repository where developers can share, pull, and rebuild container images.",
    },
    {
      question: "What is the Docker daemon called?",
      options: ["dockerd", "docker-engine", "docker-server", "containerd"],
      correct: 0,
      explanation:
        "The Docker daemon is called dockerd and it manages Docker objects like images, containers, networks, and volumes.",
    },
    {
      question:
        "Which component is the primary way users interact with Docker?",
      options: [
        "Docker daemon",
        "Docker client",
        "Docker registry",
        "Docker engine",
      ],
      correct: 1,
      explanation:
        "The Docker client (docker command) is the primary way that many Docker users interact with Docker.",
    },
    {
      question: "What does a Dockerfile contain?",
      options: [
        "Running containers",
        "Instructions to build an image",
        "Network configurations",
        "Storage volumes",
      ],
      correct: 1,
      explanation:
        "A Dockerfile is a simple text file with instructions to build a Docker image.",
    },
    {
      question:
        "How do Virtual Machines differ from Docker containers in terms of OS?",
      options: [
        "VMs share OS kernel, containers don't",
        "VMs have full OS copy, containers share host kernel",
        "Both share OS kernel",
        "Neither uses an OS",
      ],
      correct: 1,
      explanation:
        "Each VM has a full copy of an operating system, while Docker containers share the underlying OS kernel.",
    },
    {
      question:
        "What technology do Virtual Machines use to run multiple VMs on one machine?",
      options: [
        "Namespace",
        "Hypervisor",
        "Container runtime",
        "Docker engine",
      ],
      correct: 1,
      explanation:
        "Virtual Machines use hypervisor technology which allows multiple VMs to run on a single machine.",
    },
    {
      question: "Which provides faster startup: Docker containers or VMs?",
      options: [
        "Virtual Machines",
        "Docker Containers",
        "Both are same",
        "Depends on hardware",
      ],
      correct: 1,
      explanation:
        "Docker containers enable faster startup with better performance due to sharing the host's kernel.",
    },
    {
      question: "What is a Docker Image?",
      options: [
        "A running container",
        "A template with application code and dependencies",
        "A network configuration",
        "A storage volume",
      ],
      correct: 1,
      explanation:
        "A Docker Image is a single file with all the dependencies and libraries necessary to run the program.",
    },
    {
      question: "What is Docker Engine?",
      options: [
        "A storage system",
        "Core of Docker that creates and runs containers",
        "A networking tool",
        "A monitoring service",
      ],
      correct: 1,
      explanation:
        "Docker Engine is the core of Docker, which creates and runs containers on host operating systems directly without guest OS.",
    },
    {
      question: "How do Docker client and daemon communicate?",
      options: ["Direct system calls", "REST API", "SSH protocol", "FTP"],
      correct: 1,
      explanation:
        "The Docker client and daemon communicate using a REST API, over a network interface.",
    },
    {
      question: "Where does Docker look for images by default?",
      options: ["Local storage", "Docker Hub", "AWS", "GitHub"],
      correct: 1,
      explanation:
        "By default, Docker looks for images on Docker Hub, a public registry.",
    },
    {
      question: "What command pulls required images from the registry?",
      options: ["docker get", "docker pull", "docker fetch", "docker download"],
      correct: 1,
      explanation:
        "The docker pull command is used to pull required images from the configured registry.",
    },
    {
      question: "What provides a layer of isolation for each container?",
      options: ["Hypervisor", "Namespaces", "Virtual networks", "File systems"],
      correct: 1,
      explanation:
        "Namespaces provide a layer of isolation for each container in Docker.",
    },
    {
      question: "Containers are created from what?",
      options: ["Virtual machines", "Images", "Dockerfiles", "Networks"],
      correct: 1,
      explanation:
        "Containers are created from images, which are templates that include the application code and dependencies.",
    },
    {
      question: "What is the Docker architecture type?",
      options: ["Monolithic", "Client-server", "Peer-to-peer", "Microkernel"],
      correct: 1,
      explanation: "Docker uses a client-server architecture.",
    },
    {
      question: "Which Docker component stores Docker images?",
      options: [
        "Docker daemon",
        "Docker client",
        "Docker registry",
        "Docker engine",
      ],
      correct: 2,
      explanation: "A Docker registry stores Docker images.",
    },
    {
      question: "What enables Docker to deliver software quickly?",
      options: [
        "Large file sizes",
        "Isolation from infrastructure",
        "Slow deployment",
        "Manual configuration",
      ],
      correct: 1,
      explanation:
        "Docker enables you to isolate your applications from your infrastructure so you can deliver software quickly.",
    },
    {
      question: "Docker is described as what type of platform?",
      options: ["Closed-source", "Open platform", "Proprietary", "Licensed"],
      correct: 1,
      explanation:
        "Docker is an open platform for developing, shipping, and running applications.",
    },
    {
      question: "Compared to VMs, containers are:",
      options: [
        "Heavier and slower",
        "Lighter and faster",
        "Same weight",
        "More isolated",
      ],
      correct: 1,
      explanation:
        "Containers are smaller than Virtual Machines and enable faster startup with better performance.",
    },
    {
      question: "What does Docker isolate from each other?",
      options: [
        "Networks only",
        "Application environments",
        "Hardware only",
        "Users only",
      ],
      correct: 1,
      explanation:
        "Docker Containers isolate application environments from one another.",
    },
    {
      question: "Each container has access limited to what?",
      options: [
        "All namespaces",
        "Its own namespace",
        "The host system",
        "Other containers",
      ],
      correct: 1,
      explanation:
        "Each container runs in a separate namespace and its access is limited to that namespace.",
    },
    {
      question:
        "What is included in application dependencies according to Docker?",
      options: [
        "Only the code",
        "Code, OS, runtime, web framework, and version",
        "Just the OS",
        "Only libraries",
      ],
      correct: 1,
      explanation:
        "Dependencies include code, OS, runtime, web framework, and version.",
    },

    // Kubernetes Questions (26-50)
    {
      question: "What does K8s stand for?",
      options: [
        "Kube 8 systems",
        "Kubernetes (8 letters between K and s)",
        "Kube eight server",
        "None of these",
      ],
      correct: 1,
      explanation:
        "K8s is an abbreviation for Kubernetes, where 8 represents the eight letters between K and s.",
    },
    {
      question: "Who originally developed Kubernetes?",
      options: ["Amazon", "Microsoft", "Google", "Docker Inc."],
      correct: 2,
      explanation:
        "Google developed an internal system called 'borg' (later named Omega) and introduced Kubernetes in 2014.",
    },
    {
      question: "What is the smallest unit in Kubernetes?",
      options: ["Container", "Node", "Pod", "Cluster"],
      correct: 2,
      explanation: "A Pod is the smallest and simplest unit in Kubernetes.",
    },
    {
      question: "What is a Kubernetes Cluster?",
      options: [
        "A single server",
        "A collection of nodes running containerized apps",
        "A storage system",
        "A network protocol",
      ],
      correct: 1,
      explanation:
        "A collection of nodes running containerized apps under Kubernetes management is known as a cluster.",
    },
    {
      question: "What is the role of the API server in Kubernetes?",
      options: [
        "Store data",
        "Front end of control plane",
        "Run containers",
        "Monitor nodes",
      ],
      correct: 1,
      explanation:
        "The API server is the front end of the Kubernetes control plane.",
    },
    {
      question: "What is etcd in Kubernetes?",
      options: [
        "A container runtime",
        "A distributed key-value store",
        "A networking tool",
        "A monitoring service",
      ],
      correct: 1,
      explanation:
        "Etcd is a distributed key-value store that stores the state of the Kubernetes cluster.",
    },
    {
      question: "What does the Controller Manager ensure?",
      options: [
        "Nodes are running",
        "Cluster reaches desired condition",
        "Images are pulled",
        "Networks are configured",
      ],
      correct: 1,
      explanation:
        "The controller manager ensures the cluster reaches the desired condition.",
    },
    {
      question: "What does the Scheduler do in Kubernetes?",
      options: [
        "Stores data",
        "Schedules pod execution on nodes",
        "Monitors health",
        "Creates images",
      ],
      correct: 1,
      explanation:
        "The scheduler schedules a pod's execution on a cluster node according to resource limits and other factors.",
    },
    {
      question: "What is Kubelet?",
      options: [
        "A container",
        "An agent ensuring containers run in pods",
        "A network proxy",
        "A storage manager",
      ],
      correct: 1,
      explanation:
        "Kubelet is like an agent that ensures containers are running in a pod as expected.",
    },
    {
      question: "What does Kube-proxy do?",
      options: [
        "Runs containers",
        "Assigns IP to each pod",
        "Stores images",
        "Monitors CPU",
      ],
      correct: 1,
      explanation:
        "Kube-proxy assigns IP addresses to Pods and ensures each pod gets its unique IP Address.",
    },
    {
      question: "What organization manages Kubernetes now?",
      options: ["Docker Inc.", "Google", "CNCF", "Amazon"],
      correct: 2,
      explanation:
        "Kubernetes is managed by CNCF (Cloud Native Computing Foundation).",
    },
    {
      question: "A Pod consists of:",
      options: [
        "Only one container",
        "One or more containers",
        "Virtual machines",
        "Images only",
      ],
      correct: 1,
      explanation:
        "A Pod consists of one or more containers, storage, and a network identity into a single unit.",
    },
    {
      question: "What is a Node in Kubernetes?",
      options: [
        "A container",
        "A physical or virtual machine running pods",
        "A network",
        "A storage volume",
      ],
      correct: 1,
      explanation:
        "A node is a physical or virtual machine in the Kubernetes cluster that runs pods.",
    },
    {
      question: "Kubernetes automates:",
      options: [
        "Only deployment",
        "Only scaling",
        "Deployment, scaling, and management",
        "Only monitoring",
      ],
      correct: 2,
      explanation:
        "Kubernetes automates the deployment, scaling, and management of containerized applications.",
    },
    {
      question: "What advantage does Kubernetes provide for traffic surges?",
      options: [
        "Manual scaling",
        "Automatic scalability",
        "Fixed resources",
        "No scaling",
      ],
      correct: 1,
      explanation:
        "Kubernetes enables businesses to scale applications up or down fast in response to demand.",
    },
    {
      question: "Kubernetes has built-in features for:",
      options: [
        "Manual recovery",
        "Handling failures automatically",
        "No fault tolerance",
        "Single point of failure",
      ],
      correct: 1,
      explanation:
        "Kubernetes has features built-in to handle failures, such as automatic container restarts and node replacement.",
    },
    {
      question: "What makes Kubernetes portable?",
      options: [
        "Cloud-specific APIs",
        "Standard API across environments",
        "No cloud support",
        "Single vendor lock-in",
      ],
      correct: 1,
      explanation:
        "Kubernetes offers a standard API for deploying and managing containers across various environments.",
    },
    {
      question: "Kubernetes automates operations including:",
      options: [
        "Only load balancing",
        "Load balancing, service discovery, rolling updates",
        "Only deployment",
        "Manual updates",
      ],
      correct: 1,
      explanation:
        "Kubernetes automates load balancing, service discovery, and rolling updates.",
    },
    {
      question: "Which node coordinates with other nodes in Kubernetes?",
      options: ["Worker node", "Master node", "Client node", "Storage node"],
      correct: 1,
      explanation:
        "The master node keeps the cluster in the appropriate condition by coordinating with other nodes.",
    },
    {
      question: "What is the control unit in Kubernetes?",
      options: ["Container", "Pod", "Node", "Cluster"],
      correct: 1,
      explanation:
        "In Kubernetes, the control unit is the POD, not the containers.",
    },
    {
      question: "Can you start containers without a POD in Kubernetes?",
      options: ["Yes", "No", "Sometimes", "Only in development"],
      correct: 1,
      explanation: "You cannot start containers without a POD in Kubernetes.",
    },
    {
      question: "Does Kubernetes know about individual containers?",
      options: ["Yes", "No, only PODs", "Sometimes", "Only in clusters"],
      correct: 1,
      explanation:
        "Kubernetes only knows about PODs and does not know about individual containers.",
    },
    {
      question: "A cluster has at least:",
      options: [
        "One worker node",
        "One worker node and a master node",
        "Two master nodes",
        "No minimum",
      ],
      correct: 1,
      explanation: "A cluster has at least one worker node and a master node.",
    },
    {
      question: "POD is a group of:",
      options: [
        "Networks",
        "One or more containers deployed together",
        "Storage volumes",
        "Virtual machines",
      ],
      correct: 1,
      explanation:
        "POD is a group of one or more containers that are deployed together on the same host.",
    },
    {
      question: "What runs on each worker node to manage containers?",
      options: ["API server", "Kubelet", "etcd", "Scheduler"],
      correct: 1,
      explanation:
        "Kubelet runs on each worker node and manages the containers and pods operating on that node.",
    },

    // AWS Cost Management Questions (51-75)
    {
      question: "What is the endpoint for Cost Explorer API?",
      options: [
        "https://ce.aws.com",
        "https://ce.us-east-1.amazonaws.com",
        "https://aws-cost.com",
        "https://explorer.aws.com",
      ],
      correct: 1,
      explanation:
        "The Cost Explorer API endpoint is https://ce.us-east-1.amazonaws.com",
    },
    {
      question: "AWS Budgets helps you track:",
      options: [
        "Only costs",
        "Usage-to-date, costs, and RI usage",
        "Only Reserved Instances",
        "Only subscriptions",
      ],
      correct: 1,
      explanation:
        "AWS Budgets tracks unblended costs, subscriptions, refunds, and RIs, showing usage-to-date and predictions.",
    },
    {
      question: "What type of budget helps define RI utilization threshold?",
      options: [
        "Cost budget",
        "Usage budget",
        "RI utilization budget",
        "Coverage budget",
      ],
      correct: 2,
      explanation:
        "RI utilization budgets define a utilization threshold and alert when RI usage falls below it.",
    },
    {
      question: "What does RTO stand for?",
      options: [
        "Recovery Time Optimization",
        "Recovery Time Objective",
        "Real Time Operation",
        "Restore Time Output",
      ],
      correct: 1,
      explanation:
        "RTO stands for Recovery Time Objective - the maximum acceptable downtime for system restoration.",
    },
    {
      question: "What does RPO stand for?",
      options: [
        "Recovery Point Optimization",
        "Recovery Point Objective",
        "Real Point Operation",
        "Restore Point Output",
      ],
      correct: 1,
      explanation:
        "RPO stands for Recovery Point Objective - the maximum amount of data loss measured in time that can be tolerated.",
    },
    {
      question: "Which AWS service is recommended for EC2 backups?",
      options: ["AWS CloudWatch", "AWS Backup", "AWS Lambda", "AWS Config"],
      correct: 1,
      explanation:
        "AWS Backup is the recommended managed solution for EC2 backups.",
    },
    {
      question: "What does AWS Cost Optimization Hub help with?",
      options: [
        "Only billing",
        "Identify and quantify cost savings",
        "Only reporting",
        "User management",
      ],
      correct: 1,
      explanation:
        "Cost Optimization Hub helps identify, filter, aggregate, and quantify savings for cost optimization recommendations.",
    },
    {
      question: "Amazon S3 storage classes include all EXCEPT:",
      options: ["S3 Standard", "S3 Glacier", "S3 Premium", "S3 Standard-IA"],
      correct: 2,
      explanation:
        "S3 Premium is not a real storage class. AWS offers Standard, Glacier, and Standard-IA among others.",
    },
    {
      question: "What is the AFR (Annual Failure Rate) for EBS volumes?",
      options: ["1-2%", "0.1-0.2%", "5-10%", "0.01%"],
      correct: 1,
      explanation:
        "EBS volumes have an Annual Failure Rate (AFR) of 0.1-0.2%, making them 20× more reliable than standard disks.",
    },
    {
      question: "EBS snapshots are stored in:",
      options: [
        "Local storage",
        "Amazon S3",
        "EC2 instances",
        "Docker containers",
      ],
      correct: 1,
      explanation:
        "EBS snapshots are stored in Amazon S3, redundantly across multiple Availability Zones.",
    },
    {
      question: "What is the designed availability of EBS snapshots?",
      options: ["99%", "99.9%", "99.99%", "99.999%"],
      correct: 3,
      explanation: "EBS snapshots are designed for 99.999% availability.",
    },
    {
      question: "Which service provides virtual tape library functionality?",
      options: [
        "File Gateway",
        "Volume Gateway",
        "Tape Gateway",
        "Storage Gateway",
      ],
      correct: 2,
      explanation:
        "Tape Gateway acts as a Virtual Tape Library (VTL) compatible with existing iSCSI-based backup applications.",
    },
    {
      question: "AWS Backup integrates with:",
      options: [
        "Only EC2",
        "CloudWatch, CloudTrail, IAM, Organizations",
        "Only S3",
        "Only Lambda",
      ],
      correct: 1,
      explanation:
        "AWS Backup provides an orchestration layer integrating with CloudWatch, CloudTrail, IAM, AWS Organizations, etc.",
    },
    {
      question: "What does WORM stand for in Backup Vault Lock?",
      options: [
        "Write-Only Read-Many",
        "Write-Once, Read-Many",
        "Write-Over Read-More",
        "Write-Often Read-Maybe",
      ],
      correct: 1,
      explanation:
        "WORM stands for Write-Once, Read-Many configuration for data protection.",
    },
    {
      question: "File Gateway supports which protocols?",
      options: ["Only SMB", "SMB and NFS", "Only iSCSI", "HTTP and FTP"],
      correct: 1,
      explanation: "File Gateway supports SMB and NFS access protocols.",
    },
    {
      question: "Volume Gateway provides what type of storage?",
      options: [
        "File storage",
        "iSCSI block storage",
        "Object storage",
        "Archive storage",
      ],
      correct: 1,
      explanation:
        "Volume Gateway provides iSCSI block storage volumes for on-premises servers.",
    },
    {
      question: "S3 Glacier Deep Archive provides:",
      options: [
        "Fastest access",
        "Lowest-cost storage on AWS",
        "Most expensive storage",
        "No archiving",
      ],
      correct: 1,
      explanation:
        "S3 Glacier Deep Archive provides the lowest-cost storage on AWS.",
    },
    {
      question: "What connects on-premises to AWS for backup?",
      options: ["EC2", "AWS Storage Gateway", "Lambda", "CloudFront"],
      correct: 1,
      explanation:
        "AWS Storage Gateway connects on-premises storage to the AWS Cloud.",
    },
    {
      question: "AMI stands for:",
      options: [
        "Amazon Machine Instance",
        "Amazon Machine Image",
        "AWS Machine Interface",
        "Automated Machine Image",
      ],
      correct: 1,
      explanation: "AMI stands for Amazon Machine Image.",
    },
    {
      question: "What is used for full instance-level backups?",
      options: ["Snapshots only", "AMIs", "S3 buckets", "CloudWatch"],
      correct: 1,
      explanation: "AMIs are used for full instance-level backups in AWS.",
    },
    {
      question: "Incremental backups save:",
      options: [
        "Everything",
        "Only changes since last backup",
        "Nothing",
        "Only metadata",
      ],
      correct: 1,
      explanation:
        "Incremental backups only save changes made since the last backup.",
    },
    {
      question: "Which AWS service monitors resource performance?",
      options: ["S3", "CloudWatch", "IAM", "Route 53"],
      correct: 1,
      explanation: "CloudWatch monitors resource performance and usage.",
    },
    {
      question: "AWS CloudTrail provides:",
      options: [
        "Storage",
        "Audit trail of API calls",
        "Compute power",
        "Networking",
      ],
      correct: 1,
      explanation:
        "AWS CloudTrail tracks API calls for an audit trail of actions taken on your account.",
    },
    {
      question: "Tags in AWS help with:",
      options: [
        "Only naming",
        "Organization and cost tracking",
        "Only security",
        "Only monitoring",
      ],
      correct: 1,
      explanation:
        "Tags help organize resources and track costs by project, department, or other criteria.",
    },
    {
      question: "AWS Organizations helps:",
      options: [
        "Run containers",
        "Centrally manage multiple AWS accounts",
        "Store data",
        "Monitor networks",
      ],
      correct: 1,
      explanation:
        "AWS Organizations centrally manages multiple AWS accounts and applies policies.",
    },

    // AWS ML Services Questions (76-87)
    {
      question: "Amazon SageMaker is used for:",
      options: [
        "Only deployment",
        "Build, train, and deploy ML models",
        "Only monitoring",
        "Data storage only",
      ],
      correct: 1,
      explanation:
        "Amazon SageMaker helps build, train, and deploy machine learning models at scale.",
    },
    {
      question: "Amazon Comprehend is a service for:",
      options: [
        "Image recognition",
        "Natural language processing",
        "Video analysis",
        "Data storage",
      ],
      correct: 1,
      explanation:
        "Amazon Comprehend is a natural-language processing (NLP) service using machine learning.",
    },
    {
      question: "Amazon Forecast is used for:",
      options: [
        "Weather prediction only",
        "Time-series forecasting",
        "Image classification",
        "Text analysis",
      ],
      correct: 1,
      explanation:
        "Amazon Forecast is a fully managed deep learning service for time-series forecasting.",
    },
    {
      question: "Amazon Fraud Detector detects:",
      options: [
        "Only payment fraud",
        "Potentially fraudulent online activities",
        "Network attacks",
        "Malware",
      ],
      correct: 1,
      explanation:
        "Amazon Fraud Detector identifies potentially fraudulent online activities like payment fraud and fake accounts.",
    },
    {
      question: "Amazon Textract extracts:",
      options: [
        "Only printed text",
        "Text, handwriting, and data from documents",
        "Only images",
        "Only PDFs",
      ],
      correct: 1,
      explanation:
        "Amazon Textract automatically extracts text, handwriting, layout elements, and data from documents.",
    },
    {
      question: "Amazon Transcribe converts:",
      options: [
        "Text to speech",
        "Speech to text",
        "Images to text",
        "Video to audio",
      ],
      correct: 1,
      explanation:
        "Amazon Transcribe is an automatic speech recognition (ASR) service that converts speech to text.",
    },
    {
      question: "Amazon Translate provides:",
      options: [
        "Image translation",
        "Machine translation for text",
        "Audio translation",
        "Video subtitles only",
      ],
      correct: 1,
      explanation:
        "Amazon Translate is a neural machine translation service for text.",
    },
    {
      question: "Amazon Lex is powered by the same technology as:",
      options: ["Siri", "Alexa", "Google Assistant", "Cortana"],
      correct: 1,
      explanation: "Amazon Lex is powered by the same technology as Alexa.",
    },
    {
      question: "Amazon Kendra is used for:",
      options: [
        "Data storage",
        "Enterprise search powered by ML",
        "Video streaming",
        "Email service",
      ],
      correct: 1,
      explanation:
        "Amazon Kendra is an enterprise search service powered by Machine Learning.",
    },
    {
      question: "SageMaker Studio provides:",
      options: [
        "Only training",
        "Single browser-based interface for ML workflow",
        "Only deployment",
        "Data storage",
      ],
      correct: 1,
      explanation:
        "SageMaker Studio provides a single, browser-based interface to access all necessary ML tools.",
    },
    {
      question: "Textract goes beyond OCR by:",
      options: [
        "Only reading text",
        "Identifying and extracting specific data",
        "Only scanning",
        "Printing documents",
      ],
      correct: 1,
      explanation:
        "Textract goes beyond simple OCR to identify, understand, and extract specific data from documents.",
    },
    {
      question: "Amazon Transcribe supports:",
      options: [
        "Only English",
        "100+ languages",
        "Only 10 languages",
        "Only European languages",
      ],
      correct: 1,
      explanation:
        "Amazon Transcribe supports key features across 100+ languages.",
    },

    // Legal & Economic Challenges Questions (88-100)
    {
      question: "GDPR stands for:",
      options: [
        "General Data Privacy Regulation",
        "General Data Protection Regulation",
        "Global Data Protection Rules",
        "General Digital Privacy Rights",
      ],
      correct: 1,
      explanation: "GDPR stands for General Data Protection Regulation.",
    },
    {
      question: "Which region does GDPR apply to?",
      options: ["Asia", "European Union", "North America", "Australia"],
      correct: 1,
      explanation:
        "GDPR (General Data Protection Regulation) is an EU regulation.",
    },
    {
      question: "The 'right to be forgotten' is part of:",
      options: ["CCPA only", "GDPR", "HIPAA", "SOX"],
      correct: 1,
      explanation:
        "GDPR enforces the right to erasure, also known as the 'right to be forgotten.'",
    },
    {
      question: "Data sovereignty concerns:",
      options: [
        "Storage costs only",
        "Laws restricting data transfer across borders",
        "Network speed",
        "Hardware requirements",
      ],
      correct: 1,
      explanation:
        "Data sovereignty involves laws restricting data transfer outside national borders.",
    },
    {
      question: "DPDP Act 2023 is from:",
      options: ["USA", "EU", "India", "UK"],
      correct: 2,
      explanation:
        "The Digital Personal Data Protection Act 2023 is from India.",
    },
    {
      question: "Shared responsibility model creates challenges in:",
      options: [
        "Cost only",
        "Accountability for data breaches",
        "Performance",
        "Storage capacity",
      ],
      correct: 1,
      explanation:
        "The shared responsibility model between cloud providers and clients can create accountability gaps in breaches.",
    },
    {
      question: "Economic impact of data breaches includes:",
      options: [
        "Only technical fixes",
        "Fines, legal fees, and reputational damage",
        "Only storage costs",
        "No financial impact",
      ],
      correct: 1,
      explanation:
        "Economic losses from breaches include regulatory fines, legal fees, compensation claims, and reputational harm.",
    },
    {
      question: "Vendor lock-in refers to:",
      options: [
        "Security features",
        "Difficulty migrating from one provider",
        "Storage limits",
        "Network restrictions",
      ],
      correct: 1,
      explanation:
        "Vendor lock-in occurs when migration or recovery becomes costly and technically difficult.",
    },
    {
      question: "Encryption must be maintained during:",
      options: [
        "Storage only",
        "Transmission and storage",
        "Recovery only",
        "None of these",
      ],
      correct: 1,
      explanation:
        "Encryption protects data during both transmission and storage.",
    },
    {
      question: "CCPA/CPRA is from:",
      options: ["New York", "California", "Texas", "Florida"],
      correct: 1,
      explanation:
        "CCPA/CPRA (California Consumer Privacy Act/Privacy Rights Act) is from California, USA.",
    },
    {
      question: "Blockchain in data protection ensures:",
      options: [
        "Fast processing only",
        "Data integrity through immutable records",
        "Low cost",
        "Easy deletion",
      ],
      correct: 1,
      explanation:
        "Blockchain ensures data integrity and transparency through immutable records.",
    },
    {
      question: "Zero-Trust Security Model means:",
      options: [
        "Trust everyone",
        "Continuously verify users and devices",
        "No verification needed",
        "One-time verification",
      ],
      correct: 1,
      explanation:
        "Zero-Trust continuously verifies users and devices to prevent unauthorized access.",
    },
    {
      question: "AI and ML in data protection help with:",
      options: [
        "Storage only",
        "Real-time threat detection",
        "Cost reduction only",
        "Data deletion",
      ],
      correct: 1,
      explanation:
        "AI and ML detect and respond to cyber threats in real time.",
    },
  ];

  const handleAnswerClick = (selectedIndex) => {
    // Prevent multiple selections
    if (showResult) return;

    setSelectedAnswer(selectedIndex);
    setShowResult(true);

    const isCorrect = selectedIndex === questions[currentQuestion].correct;
    const newAnsweredQuestions = [
      ...answeredQuestions,
      {
        question: currentQuestion,
        correct: isCorrect,
      },
    ];
    setAnsweredQuestions(newAnsweredQuestions);

    // Use functional update to avoid stale closure
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizComplete(false);
  };

  const getScorePercentage = () => {
    if (questions.length === 0) return 0;
    return parseFloat(((score / questions.length) * 100).toFixed(1));
  };

  const getGrade = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90)
      return { grade: "A+", color: "text-green-600", message: "Outstanding!" };
    if (percentage >= 80)
      return { grade: "A", color: "text-green-500", message: "Excellent!" };
    if (percentage >= 70)
      return { grade: "B", color: "text-blue-500", message: "Good Job!" };
    if (percentage >= 60)
      return { grade: "C", color: "text-yellow-500", message: "Not Bad!" };
    return { grade: "F", color: "text-red-500", message: "Keep Practicing!" };
  };

  if (quizComplete) {
    const grade = getGrade();
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <Award className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Quiz Complete!
          </h2>
          <div className="mb-6">
            <p className="text-5xl font-bold mb-2">
              {score}/{questions.length}
            </p>
            <p className="text-2xl font-semibold mb-1">
              {getScorePercentage()}%
            </p>
            <p className={`text-xl font-bold ${grade.color}`}>
              {grade.grade} - {grade.message}
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isCorrect =
    selectedAnswer !== null && selectedAnswer === currentQ.correct;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              Score: {score}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {currentQ.question}
        </h2>

        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, index) => {
            let buttonClass =
              "w-full text-left p-4 rounded-lg border-2 transition-all font-medium ";

            if (showResult) {
              if (index === currentQ.correct) {
                buttonClass += "bg-green-100 border-green-500 text-green-800";
              } else if (
                index === selectedAnswer &&
                index !== currentQ.correct
              ) {
                buttonClass += "bg-red-100 border-red-500 text-red-800";
              } else {
                buttonClass += "bg-gray-50 border-gray-300 text-gray-600";
              }
            } else {
              buttonClass +=
                "bg-white border-gray-300 text-gray-700 hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={showResult}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && index === currentQ.correct && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {showResult &&
                    index === selectedAnswer &&
                    index !== currentQ.correct && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                </div>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-gray-700">
              <span className="font-semibold">Explanation: </span>
              {currentQ.explanation}
            </p>
          </div>
        )}

        {showResult && (
          <button
            onClick={handleNext}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {currentQuestion < questions.length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CloudComputingQuiz;
