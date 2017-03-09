module.exports = {
    General: {
        DatabaseUnavailable: 'Neo.TransientError.General.DatabaseUnavailable',
        ForbiddenOnReadOnlyDatabase: 'Neo.ClientError.General.ForbiddenOnReadOnlyDatabase',
        IndexCorruptionDetected: 'Neo.DatabaseError.General.IndexCorruptionDetected',
        SchemaCorruptionDetected: 'Neo.DatabaseError.General.SchemaCorruptionDetected',
        UnknownError: 'Neo.DatabaseError.General.UnknownError'
    },
    LegacyIndex: {
        LegacyIndexNotFound: 'Neo.ClientError.LegacyIndex.LegacyIndexNotFound'
    },
    Network: {
        CommunicationError: 'Neo.TransientError.Network.CommunicationError'
    },
    Procedure: {
        ProcedureCallFailed: 'Neo.ClientError.Procedure.ProcedureCallFailed',
        ProcedureNotFound: 'Neo.ClientError.Procedure.ProcedureNotFound',
        ProcedureRegistrationFailed: 'Neo.ClientError.Procedure.ProcedureRegistrationFailed',
        TypeError: 'Neo.ClientError.Procedure.TypeError'
    },
    Request: {
        Invalid: 'Neo.ClientError.Request.Invalid',
        InvalidFormat: 'Neo.ClientError.Request.InvalidFormat',
        TransactionRequired: 'Neo.ClientError.Request.TransactionRequired'
    },
    Schema: {
        ConstraintAlreadyExists: 'Neo.ClientError.Schema.ConstraintAlreadyExists',
        ConstraintCreationFailed: 'Neo.DatabaseError.Schema.ConstraintCreationFailed',
        ConstraintDropFailed: 'Neo.DatabaseError.Schema.ConstraintDropFailed',
        ConstraintNotFound: 'Neo.ClientError.Schema.ConstraintNotFound',
        ConstraintValidationFailed: 'Neo.ClientError.Schema.ConstraintValidationFailed',
        ConstraintVerificationFailed: 'Neo.ClientError.Schema.ConstraintVerificationFailed',
        ForbiddenOnConstraintIndex: 'Neo.ClientError.Schema.ForbiddenOnConstraintIndex',
        IndexAlreadyExists: 'Neo.ClientError.Schema.IndexAlreadyExists',
        IndexCreationFailed: 'Neo.DatabaseError.Schema.IndexCreationFailed',
        IndexDropFailed: 'Neo.DatabaseError.Schema.IndexDropFailed',
        IndexNotFound: 'Neo.ClientError.Schema.IndexNotFound',
        LabelAccessFailed: 'Neo.DatabaseError.Schema.LabelAccessFailed',
        LabelLimitReached: 'Neo.DatabaseError.Schema.LabelLimitReached',
        PropertyKeyAccessFailed: 'Neo.DatabaseError.Schema.PropertyKeyAccessFailed',
        RelationshipTypeAccessFailed: 'Neo.DatabaseError.Schema.RelationshipTypeAccessFailed',
        SchemaModifiedConcurrently: 'Neo.TransientError.Schema.SchemaModifiedConcurrently',
        SchemaRuleAccessFailed: 'Neo.DatabaseError.Schema.SchemaRuleAccessFailed',
        SchemaRuleDuplicateFound: 'Neo.DatabaseError.Schema.SchemaRuleDuplicateFound',
        TokenNameError: 'Neo.ClientError.Schema.TokenNameError'
    },
    Security: {
        AuthenticationRateLimit: 'Neo.ClientError.Security.AuthenticationRateLimit',
        CredentialsExpired: 'Neo.ClientError.Security.CredentialsExpired',
        EncryptionRequired: 'Neo.ClientError.Security.EncryptionRequired',
        Forbidden: 'Neo.ClientError.Security.Forbidden',
        ModifiedConcurrently: 'Neo.TransientError.Security.ModifiedConcurrently',
        Unauthorized: 'Neo.ClientError.Security.Unauthorized'
    },
    Statement: {
        ArgumentError: 'Neo.ClientError.Statement.ArgumentError',
        ArithmeticError: 'Neo.ClientError.Statement.ArithmeticError',
        CartesianProductWarning: 'Neo.ClientNotification.Statement.CartesianProductWarning',
        ConstraintVerificationFailed: 'Neo.ClientError.Statement.ConstraintVerificationFailed',
        DynamicPropertyWarning: 'Neo.ClientNotification.Statement.DynamicPropertyWarning',
        EagerOperatorWarning: 'Neo.ClientNotification.Statement.EagerOperatorWarning',
        EntityNotFound: 'Neo.ClientError.Statement.EntityNotFound',
        ExecutionFailed: 'Neo.DatabaseError.Statement.ExecutionFailed',
        ExhaustiveShortestPathWarning: 'Neo.ClientNotification.Statement.ExhaustiveShortestPathWarning',
        ExternalResourceFailed: 'Neo.TransientError.Statement.ExternalResourceFailed',
        FeatureDeprecationWarning: 'Neo.ClientNotification.Statement.FeatureDeprecationWarning',
        JoinHintUnfulfillableWarning: 'Neo.ClientNotification.Statement.JoinHintUnfulfillableWarning',
        JoinHintUnsupportedWarning: 'Neo.ClientNotification.Statement.JoinHintUnsupportedWarning',
        LabelNotFound: 'Neo.ClientError.Statement.LabelNotFound',
        NoApplicableIndexWarning: 'Neo.ClientNotification.Statement.NoApplicableIndexWarning',
        ParameterMissing: 'Neo.ClientError.Statement.ParameterMissing',
        PlannerUnsupportedWarning: 'Neo.ClientNotification.Statement.PlannerUnsupportedWarning',
        PropertyNotFound: 'Neo.ClientError.Statement.PropertyNotFound',
        RuntimeUnsupportedWarning: 'Neo.ClientNotification.Statement.RuntimeUnsupportedWarning',
        SemanticError: 'Neo.ClientError.Statement.SemanticError',
        SyntaxError: 'Neo.ClientError.Statement.SyntaxError',
        TypeError: 'Neo.ClientError.Statement.TypeError',
        UnboundedVariableLengthPatternWarning: 'Neo.ClientNotification.Statement.UnboundedVariableLengthPatternWarning',
        UnknownLabelWarning: 'Neo.ClientNotification.Statement.UnknownLabelWarning',
        UnknownPropertyKeyWarning: 'Neo.ClientNotification.Statement.UnknownPropertyKeyWarning',
        UnknownRelationshipTypeWarning: 'Neo.ClientNotification.Statement.UnknownRelationshipTypeWarning'
    },
    Transaction: {
        ConstraintsChanged: 'Neo.TransientError.Transaction.ConstraintsChanged',
        DeadlockDetected: 'Neo.TransientError.Transaction.DeadlockDetected',
        ForbiddenDueToTransactionType: 'Neo.ClientError.Transaction.ForbiddenDueToTransactionType',
        InstanceStateChanged: 'Neo.TransientError.Transaction.InstanceStateChanged',
        LockSessionExpired: 'Neo.TransientError.Transaction.LockSessionExpired',
        TransactionAccessedConcurrently: 'Neo.ClientError.Transaction.TransactionAccessedConcurrently',
        TransactionCommitFailed: 'Neo.DatabaseError.Transaction.TransactionCommitFailed',
        TransactionEventHandlerFailed: 'Neo.ClientError.Transaction.TransactionEventHandlerFailed',
        TransactionHookFailed: 'Neo.ClientError.Transaction.TransactionHookFailed',
        TransactionLogError: 'Neo.DatabaseError.Transaction.TransactionLogError',
        TransactionMarkedAsFailed: 'Neo.ClientError.Transaction.TransactionMarkedAsFailed',
        TransactionNotFound: 'Neo.ClientError.Transaction.TransactionNotFound',
        TransactionRollbackFailed: 'Neo.DatabaseError.Transaction.TransactionRollbackFailed',
        TransactionStartFailed: 'Neo.DatabaseError.Transaction.TransactionStartFailed',
        TransactionTerminated: 'Neo.ClientError.Transaction.TransactionTerminated',
        TransactionValidationFailed: 'Neo.ClientError.Transaction.TransactionValidationFailed'
    }
};
