from typing import List
from schemas.project import (
    GenerateProjectsRequest,
    ProjectIdea,
    GenerateProjectsResponse,
)
from schemas.evaluation import (
    EvaluateProjectRequest,
    EvaluateProjectResponse,
)
from schemas.improvement import (
    ImproveProjectRequest,
    ImproveProjectResponse,
)
from schemas.mentor import (
    MentorRequest,
    MentorResponse,
)


def generate_mock_projects(request: GenerateProjectsRequest) -> GenerateProjectsResponse:
    """
    Generates 3 rich, contextual project ideas tailored to the student's skills and constraints.
    Adheres 100% to the GenerateProjectsResponse Pydantic schema.
    """
    primary_interest = request.interests[0] if request.interests else "AI Systems"
    primary_skill = request.skills[0] if request.skills else "Python"
    skills_str = ", ".join(request.skills)
    team_context = f"{request.team_size}-engineer team over {request.duration}"

    project_1 = ProjectIdea(
        id="project-1",
        title=f"Adaptive {primary_interest} Intelligence Engine",
        tagline=f"High-throughput decision engine leveraging {primary_skill} with real-time auditability.",
        problem=(
            f"Current workflows in {primary_interest} rely on brittle rule engines or opaque black-box "
            f"models that fail to provide actionable justifications, leading to poor adoption and regulatory friction."
        ),
        solution=(
            f"An end-to-end analytical pipeline integrating {skills_str} to extract, normalize, and score "
            f"multimodal telemetry with deterministic explainability and low-latency inference."
        ),
        why_it_fits=(
            f"Directly harnesses your team's background in {skills_str}, calibrated for a {team_context} "
            f"with balanced milestone boundaries and observable engineering checkpoints."
        ),
        innovation_score=91,
        feasibility_score=86,
        impact_score=89,
        technical_depth_score=92,
        difficulty=request.difficulty.capitalize(),
        features=[
            "Multimodal ingestion pipeline with schema validation and sanitization",
            f"Inference service built in {primary_skill} with sub-100ms response targets",
            "SHAP/LIME attribution layer for continuous model interpretability",
            "Interactive telemetry dashboard with alert threshold tuning",
        ],
        advanced_features=[
            "Dynamic drift detection with automated retrain trigger flags",
            "Hardware acceleration profiling with batch quantization",
            "Differential privacy compliance engine for sensitive attributes",
        ],
        tech_stack=[
            f"Core Logic: {primary_skill}",
            "API Service: FastAPI / Python 3.13",
            "Data Layer: PostgreSQL + Redis Caching",
            "Model Runtime: ONNX Runtime / PyTorch",
            "Frontend Client: React + TypeScript",
        ],
        architecture=[
            "Ingestion Gateway (REST/WebSocket)",
            "Preprocessing & Feature Extraction Queue",
            "Core Model Inference Node",
            "Explainability Attribution Service",
            "Audit Log & Analytics Datastore",
        ],
        roadmap=[
            f"Weeks 1-2: Problem formulation, literature review, and schema definition for {primary_interest}",
            "Weeks 3-4: Data synthesis, benchmark dataset ingestion, and baseline model training",
            "Weeks 5-6: Service orchestration, explainability layer, and API contract hardening",
            "Weeks 7-8: Stress testing, rubric alignment, documentation, and viva defense demo",
        ],
        datasets=[
            f"Public Domain Repository for {primary_interest} (Synthetically augmented)",
            "Synthetic Adversarial Edge Cases Dataset (10k records)",
        ],
        risks=[
            "Feature leakage during real-time batch preprocessing",
            "Inference latency spikes under un-batched payload bursts",
            "Overfitting to synthetic baseline benchmarks",
        ],
        improvements=[
            "Introduce async event-driven architecture using Kafka or Redis Pub/Sub",
            "Benchmark against state-of-the-art industry baselines for academic defense",
        ],
    )

    project_2 = ProjectIdea(
        id="project-2",
        title=f"Decentralized {primary_interest} Verification Network",
        tagline=f"Cryptographically verified distributed tracking and auditing framework for {primary_interest}.",
        problem=(
            f"Stakeholders in {primary_interest} struggle with data tampering, fragmented provenance, "
            f"and untrusted centralized authorities when exchanging mission-critical artifacts."
        ),
        solution=(
            f"A tamper-evident, verifiable telemetry registry utilizing cryptographic hash chains, "
            f"zero-knowledge assertions, and high-performance querying built upon {skills_str}."
        ),
        why_it_fits=(
            f"Provides rigorous technical differentiation for your final-year submission, combining "
            f"{primary_skill} backend logic with modern cryptographic validation primitives."
        ),
        innovation_score=94,
        feasibility_score=80,
        impact_score=87,
        technical_depth_score=95,
        difficulty="Challenging",
        features=[
            "Cryptographic proof generation pipeline for state transitions",
            "Immutable audit log with Merkle tree verification endpoints",
            "Role-based credential issuance with fine-grained access control",
            "High-throughput query engine with index acceleration",
        ],
        advanced_features=[
            "Zero-knowledge attribute verification without raw data exposure",
            "Distributed consensus simulator for multi-node evaluation",
            "Automated formal verification of core transition invariants",
        ],
        tech_stack=[
            f"Execution Logic: {primary_skill}",
            "Security Primitives: Cryptography / OpenSSL",
            "FastAPI Async Microservices",
            "Persistence: TimescaleDB / SQLite WAL",
            "Visualization: WebGL / React Graph Visualizer",
        ],
        architecture=[
            "Client Verification Portal",
            "Authentication & Key Management Service",
            "Merkle Tree Commit Node",
            "Audit Verification Worker Pool",
            "Immutable Storage Ledger",
        ],
        roadmap=[
            "Weeks 1-2: Cryptographic specifications and system boundary definition",
            "Weeks 3-4: Merkle tree engine and consensus abstraction implementation",
            "Weeks 5-6: Microservice integration, verification API, and frontend inspector",
            "Weeks 7-8: Benchmark evaluations, attack vector simulation, and project report",
        ],
        datasets=[
            "Synthetic Transaction Benchmark Stream (100k records)",
            "Known Vulnerability & Tampering Test Suites",
        ],
        risks=[
            "Computational overhead during Merkle proof generation at high TPS",
            "Scope creep around distributed consensus edge cases",
        ],
        improvements=[
            "Implement caching for repeated proof verifications",
            "Provide an interactive terminal CLI for examiners during project defense",
        ],
    )

    project_3 = ProjectIdea(
        id="project-3",
        title=f"Edge-Optimized {primary_interest} Predictive Monitor",
        tagline=f"Ultra-lightweight embedded and edge telemetry analyzer designed for resource-constrained environments.",
        problem=(
            f"Existing solutions in {primary_interest} mandate continuous high-bandwidth cloud uplink, "
            f"rendering them inoperable in air-gapped, remote, or resource-constrained deployments."
        ),
        solution=(
            f"A quantized, localized inference engine built with {primary_skill} that processes sensor "
            f"streams locally, computes predictive anomaly scores, and synchronizes opportunistically."
        ),
        why_it_fits=(
            f"Excellent practical feasibility for a {team_context}. Demonstrates engineering pragmatism, "
            f"resource optimization, and clear measurable performance benchmarks."
        ),
        innovation_score=88,
        feasibility_score=93,
        impact_score=91,
        technical_depth_score=87,
        difficulty="Balanced",
        features=[
            "Quantized model runtime with negligible CPU/memory footprint",
            "Local circular buffer for sensor telemetry persistence",
            "Real-time statistical anomaly detection algorithm",
            "Store-and-forward opportunistic network synchronization",
        ],
        advanced_features=[
            "Dynamic precision scaling based on battery and thermal thresholds",
            "Firmware OTA simulation for model weight hot-reloading",
            "Cross-platform compilation support (ARM64, x86_64, WASM)",
        ],
        tech_stack=[
            f"Runtime: {primary_skill} / C++ Bindings",
            "API Service: FastAPI lightweight container",
            "Serialization: Protocol Buffers / MessagePack",
            "Database: SQLite / DuckDB embedded",
            "Monitoring: Prometheus + Grafana telemetry",
        ],
        architecture=[
            "Edge Telemetry Ingestion Driver",
            "Quantized Signal Filtering & DSP Layer",
            "Localized Predictive Anomaly Engine",
            "Opportunistic Synchronization Queue",
            "Central Administrative Gateway",
        ],
        roadmap=[
            "Weeks 1-2: Hardware/OS constraint profiling and signal simulator setup",
            "Weeks 3-4: Quantization pipeline and localized inference logic implementation",
            "Weeks 5-6: Synchronization protocol, error recovery, and dashboard integration",
            "Weeks 7-8: Power/memory profiling benchmarks, academic report, and final demonstration",
        ],
        datasets=[
            "Public Edge Anomaly Telemetry Dataset",
            "Synthetically Generated Sensor Noise & Dropout Logs",
        ],
        risks=[
            "Accuracy trade-offs from aggressive weight quantization",
            "Data synchronization conflicts across intermittent connections",
        ],
        improvements=[
            "Add federated weight aggregation across multiple simulated edge nodes",
            "Publish a benchmark paper draft comparing FP32 vs INT8 latency",
        ],
    )

    return GenerateProjectsResponse(projects=[project_1, project_2, project_3])


def evaluate_mock_project(request: EvaluateProjectRequest) -> EvaluateProjectResponse:
    """
    Evaluates a selected project against the student's constraints with realistic scoring.
    """
    proj = request.project
    ctx = request.student_context

    innovation = proj.innovation_score
    feasibility = proj.feasibility_score
    depth = proj.technical_depth_score
    impact = proj.impact_score
    uniqueness = min(98, innovation + 2)
    scope = max(70, min(95, int(100 - (ctx.team_size * 2))))
    overall = int((innovation + feasibility + depth + impact + uniqueness + scope) / 6)

    return EvaluateProjectResponse(
        innovation_score=innovation,
        feasibility_score=feasibility,
        impact_score=impact,
        technical_depth_score=depth,
        uniqueness_score=uniqueness,
        scope_score=scope,
        overall_score=overall,
        strengths=[
            f"Strong architectural coherence utilizing {', '.join(proj.tech_stack[:2])}.",
            f"Direct alignment with {', '.join(ctx.skills)} enables rapid prototyping without steep learning curves.",
            "Well-defined MVP feature boundary prevents common initial stalling.",
            "Incorporates measurable verification benchmarks that examiners look for.",
        ],
        weaknesses=[
            f"The current scope around '{proj.features[-1]}' may strain a {ctx.team_size}-person team within {ctx.duration}.",
            "Dataset acquisition and curation strategy needs formal validation earlier in the timeline.",
            "Evaluation metrics must be strictly defined before baseline model training.",
        ],
        risks=[
            f"Timeline risk: Testing and integration planned late in the {ctx.duration} schedule.",
            "Complexity risk: Advanced features could cause delivery delays if prioritized over MVP.",
        ],
        recommendations=[
            "Freeze the core API contracts during Week 2 before parallel development begins.",
            "Implement automated end-to-end integration tests by Week 4 to prevent integration crunch.",
            "Prepare a side-by-side comparison table with existing literature for the project defense.",
        ],
    )


def improve_mock_project(request: ImproveProjectRequest) -> ImproveProjectResponse:
    """
    Generates actionable architectural, technical, and scope improvements for the project.
    """
    original = request.project

    # Create an enhanced project clone
    improved = original.model_copy(deep=True)
    improved.innovation_score = min(99, original.innovation_score + 5)
    improved.feasibility_score = min(98, original.feasibility_score + 6)
    improved.technical_depth_score = min(99, original.technical_depth_score + 4)
    improved.impact_score = min(99, original.impact_score + 3)

    new_features = list(original.features) + [
        "Automated continuous validation pipeline with drift monitoring",
        "Deterministic benchmark harness comparing against 3 baseline algorithms",
    ]
    improved.features = new_features

    improved.advanced_features = list(original.advanced_features) + [
        "Exportable reproducible artifact bundle (Docker + Helm/Compose manifests)"
    ]

    return ImproveProjectResponse(
        improved_project=improved,
        summary_of_changes=(
            f"Hardened '{original.title}' by introducing automated benchmark comparisons, "
            f"pruning speculative dependencies, and optimizing timeline execution for {request.student_context.duration}."
        ),
        feature_improvements=[
            "Added an automated baseline comparison harness for quantifiable project defense metrics.",
            "Replaced manual data loading with a verified asynchronous streaming pipeline.",
            "Introduced automated health probes and observability metrics for all subservices.",
        ],
        technical_improvements=[
            "Adopted explicit Pydantic schema validation at every microservice boundary.",
            "Standardized on structured logging with OpenTelemetry tracing headers.",
            "Configured continuous caching for hot inference paths using Redis.",
        ],
        architecture_improvements=[
            "Decoupled telemetry ingestion from inference compute via a bounded async buffer.",
            "Isolated database access behind a clean repository pattern for seamless testing.",
        ],
        innovation_opportunities=[
            "Publish an open-source evaluation benchmark repository on GitHub.",
            "Draft a conference-style workshop paper evaluating novel latency/accuracy tradeoffs.",
        ],
        scope_adjustments=[
            "Postponed non-essential UI customizations to post-submission phase.",
            "Pre-allocated Week 7 exclusively for report writing, slide deck, and live defense rehearsal.",
        ],
        scalability_improvements=[
            "Containerized deployment configuration with Docker Compose and resource limits.",
            "Stateless API server design allowing horizontal replication if tested under load.",
        ],
    )


def ask_mock_mentor(request: MentorRequest) -> MentorResponse:
    """
    Generates deeply contextual mentor advice based on the project and student question.
    """
    proj = request.project
    ctx = request.student_context
    q = request.question.lower()

    if "innovat" in q or "novel" in q:
        answer = (
            f"To elevate the innovation of '{proj.title}', avoid merely assembling existing libraries. "
            f"Examiners look for a specific novel contribution: either a tailored loss function, a hybrid "
            f"model architecture combining {ctx.skills[0]} with heuristic domain constraints, or a unique benchmark "
            f"on an under-explored {ctx.interests[0]} dataset. Focus on the '{proj.solution}' aspect."
        )
        action = "Formulate a concrete benchmark experiment comparing your approach against 2 standard baselines."
        takeaways = [
            "Innovation in capstone projects comes from rigor and measured comparison, not complexity for its own sake.",
            f"Emphasize the {proj.why_it_fits} angle in your introduction.",
        ]
    elif "timeline" in q or "week" in q or "finish" in q or "complete" in q:
        answer = (
            f"For a {ctx.team_size}-person team with {ctx.duration}, '{proj.title}' is feasible if and only if "
            f"you lock down the MVP features within the first 3 weeks. The greatest danger is spending too long on "
            f"researching architectures before having an end-to-end working pipeline."
        )
        action = "Build a 'tracer bullet' prototype: connect a dummy client to your backend and database within 5 days."
        takeaways = [
            "Get an imperfect end-to-end slice working in Week 2.",
            "Do not begin advanced features until the core pipeline passes regression tests.",
        ]
    elif "first" in q or "start" in q or "begin" in q:
        answer = (
            f"For '{proj.title}', build '{proj.features[0]}' first. "
            f"Without the core data ingestion and validation contracts in place, any downstream model or UI "
            f"development will be built on assumptions and will require rework."
        )
        action = f"Draft the API OpenAPI specification and sample JSON schemas for {proj.tech_stack[0]}."
        takeaways = [
            "Contract-first development saves weeks of integration friction.",
            f"Assign each of your {ctx.team_size} team members to a clearly decoupled architectural layer.",
        ]
    elif "remove" in q or "cut" in q or "time" in q:
        answer = (
            f"If timeline pressure mounts on '{proj.title}', cut: {proj.advanced_features[0]}. "
            f"Final-year evaluators award 80% of marks to a rock-solid, well-explained MVP with thorough testing "
            f"rather than an incomplete attempt at complex advanced features."
        )
        action = "Tag all advanced features as 'Phase 2 / Future Work' in your project specification."
        takeaways = [
            "A finished simple system beats a broken ambitious system 100% of the time.",
            "Defend why features were deferred in your report—evaluators value engineering prioritization.",
        ]
    else:
        answer = (
            f"Regarding '{request.question}' in the context of '{proj.title}': "
            f"Your team has a strong baseline using {', '.join(ctx.skills[:3])}. Ensure that every architectural "
            f"decision you make directly maps back to solving '{proj.problem}'. Keep your codebase modular "
            f"so each of the {ctx.team_size} members can commit independently without merge conflicts."
        )
        action = "Document this design decision in your technical architecture log for your final report."
        takeaways = [
            f"Keep the focus on {proj.title}'s measurable problem statement.",
            f"Leverage your team's strength in {ctx.skills[0]} to drive core throughput.",
        ]

    return MentorResponse(
        answer=answer,
        recommended_next_action=action,
        key_takeaways=takeaways,
        relevant_risks=proj.risks[:2],
    )
