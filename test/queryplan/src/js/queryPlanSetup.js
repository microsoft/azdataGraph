function getGraph() {
	var s = '{"label":"SELECT","metrics":[{"name":"Set Options","value":"ANSI_NULLS: True, ANSI_PADDING: True, ANSI_WARNINGS: True, ARITHABORT: True"},{"name":"StatementCompId","value":"1"},{"name":"Estimated Number of Rows Per Execution","value":"2637.97"},{"name":"StatementId","value":"1"},{"name":"Optimization Level","value":"FULL"},{"name":"Reason For Early Termination Of Statement Optimization","value":"Good Enough Plan Found"},{"name":"CardinalityEstimationModelVersion","value":"150"},{"name":"StatementSubTreeCost","value":"0.114841"},{"name":"Statement","value":"SELECT *\\r\\nFROM sys.objects"},{"name":"StatementType","value":"SELECT"},{"name":"QueryHash","value":"0x58767712C97233B0"},{"name":"QueryPlanHash","value":"0xEAB53BC0ABF34472"},{"name":"RetrievedFromCache","value":"false"},{"name":"SecurityPolicyApplied","value":"False"},{"name":"MemoryGrantInfo","value":""},{"name":"OptimizerHardwareDependentProperties","value":""},{"name":"OptimizerStatsUsage","value":""},{"name":"NonParallelPlanReason","value":"CouldNotGenerateValidParallelPlan"},{"name":"Cached plan size","value":"120 KB"},{"name":"CompileTime","value":"24"},{"name":"CompileCPU","value":"24"},{"name":"CompileMemory","value":"1064"},{"name":"Estimated Number of Rows for All Executions","value":"0"}],"icon":"result","children":[{"label":"Hash Match\\n(Right Outer Join)","metrics":[{"name":"Output List","value":"[master].[sys].[sysschobjs].id, [master].[sys].[sysschobjs].name, [master]."},{"name":"Memory Fractions","value":"Memory Fractions Input: 0.5, Memory Fractions Output: 0.5"},{"name":"Estimated Row Size","value":"237 B"},{"name":"Estimated CPU Cost","value":"0.039206"},{"name":"Estimated I/O Cost","value":"0"},{"name":"Estimated Rebinds","value":"0"},{"name":"Estimated Rewinds","value":"0"},{"name":"Estimated Execution Mode","value":"Row"},{"name":"Estimated Number of Rows Per Execution","value":"2637.97"},{"name":"Logical Operation","value":"Right Outer Join"},{"name":"Node ID","value":"0"},{"name":"Parallel","value":"False"},{"name":"Physical Operation","value":"Hash Match"},{"name":"EstimatedTotalSubtreeCost","value":"0.114841"},{"name":"Hash Keys Build","value":"[mssqlsystemresource].[sys].[syspalnames].value"},{"name":"Hash Keys Probe","value":"[master].[sys].[sysschobjs].type"},{"name":"Probe Residual","value":"[mssqlsystemresource].[sys].[syspalnames].[value] as [n].[value]=[master].["},{"name":"Defined Values","value":""},{"name":"Estimated Number of Executions","value":"1"},{"name":"Estimated Number of Rows for All Executions","value":"2637.97"}],"children":[{"label":"Clustered Index Seek (Clustered)\\n[syspalnames].[cl] [n]","metrics":[{"name":"Output List","value":"[mssqlsystemresource].[sys].[syspalnames].value, [mssqlsystemresource].[sys"},{"name":"Estimated Row Size","value":"74 B"},{"name":"Estimated CPU Cost","value":"0.0001922"},{"name":"Estimated I/O Cost","value":"0.003125"},{"name":"Estimated Rebinds","value":"0"},{"name":"Estimated Rewinds","value":"0"},{"name":"Estimated Execution Mode","value":"Row"},{"name":"Estimated Number of Rows Per Execution","value":"32"},{"name":"Estimated Number of Rows to be Read","value":"32"},{"name":"Logical Operation","value":"Clustered Index Seek"},{"name":"Node ID","value":"1"},{"name":"Parallel","value":"False"},{"name":"Physical Operation","value":"Clustered Index Seek"},{"name":"EstimatedTotalSubtreeCost","value":"0.0033172"},{"name":"TableCardinality","value":"159"},{"name":"Seek Predicates","value":"Seek Keys[1]: Prefix: [mssqlsystemresource].[sys].[syspalnames].class = Sca"},{"name":"Ordered","value":"True"},{"name":"Scan Direction","value":"FORWARD"},{"name":"Forced Index","value":"False"},{"name":"ForceSeek","value":"False"},{"name":"ForceScan","value":"False"},{"name":"NoExpandHint","value":"False"},{"name":"Storage","value":"RowStore"},{"name":"Object","value":"[mssqlsystemresource].[sys].[syspalnames].[cl] [n]"},{"name":"Defined Values","value":"[mssqlsystemresource].[sys].[syspalnames].value, [mssqlsystemresource].[sys"},{"name":"PhysicalOperationKind","value":"Clustered"},{"name":"Estimated Number of Executions","value":"1"},{"name":"Estimated Number of Rows for All Executions","value":"32"}],"icon":"clusteredIndexSeek","children":[]},{"label":"Hash Match\\n(Right Outer Join)","metrics":[{"name":"Output List","value":"[master].[sys].[sysschobjs].id, [master].[sys].[sysschobjs].name, [master]."},{"name":"Memory Fractions","value":"Memory Fractions Input: 0.5, Memory Fractions Output: 0.5"},{"name":"Estimated Row Size","value":"177 B"},{"name":"Estimated CPU Cost","value":"0.0315043"},{"name":"Estimated I/O Cost","value":"0"},{"name":"Estimated Rebinds","value":"0"},{"name":"Estimated Rewinds","value":"0"},{"name":"Estimated Execution Mode","value":"Row"},{"name":"Estimated Number of Rows Per Execution","value":"2573.29"},{"name":"Logical Operation","value":"Right Outer Join"},{"name":"Node ID","value":"2"},{"name":"Parallel","value":"False"},{"name":"Physical Operation","value":"Hash Match"},{"name":"EstimatedTotalSubtreeCost","value":"0.0723146"},{"name":"Hash Keys Build","value":"[master].[sys].[syssingleobjrefs].depid"},{"name":"Hash Keys Probe","value":"[master].[sys].[sysschobjs].id"},{"name":"Defined Values","value":""},{"name":"Estimated Number of Executions","value":"1"},{"name":"Estimated Number of Rows for All Executions","value":"2573.29"}],"children":[{"label":"Index Scan (NonClustered)\\n[syssingleobjrefs].[nc1] [r]","metrics":[{"name":"Output List","value":"[master].[sys].[syssingleobjrefs].depid, [master].[sys].[syssingleobjrefs]."},{"name":"Estimated Row Size","value":"20 B"},{"name":"Estimated CPU Cost","value":"0.0003924"},{"name":"Estimated I/O Cost","value":"0.003125"},{"name":"Estimated Rebinds","value":"0"},{"name":"Estimated Rewinds","value":"0"},{"name":"Estimated Execution Mode","value":"Row"},{"name":"Estimated Number of Rows Per Execution","value":"1"},{"name":"Estimated Number of Rows to be Read","value":"214"},{"name":"Logical Operation","value":"Index Scan"},{"name":"Node ID","value":"3"},{"name":"Parallel","value":"False"},{"name":"Physical Operation","value":"Index Scan"},{"name":"EstimatedTotalSubtreeCost","value":"0.0035174"},{"name":"TableCardinality","value":"214"},{"name":"Predicate","value":"[master].[sys].[syssingleobjrefs].[class] as [r].[class]=(97) AND [master]."},{"name":"Ordered","value":"False"},{"name":"Forced Index","value":"False"},{"name":"ForceSeek","value":"False"},{"name":"ForceScan","value":"False"},{"name":"NoExpandHint","value":"False"},{"name":"Storage","value":"RowStore"},{"name":"Object","value":"[master].[sys].[syssingleobjrefs].[nc1] [r]"},{"name":"Defined Values","value":"[master].[sys].[syssingleobjrefs].depid, [master].[sys].[syssingleobjrefs]."},{"name":"PhysicalOperationKind","value":"NonClustered"},{"name":"Estimated Number of Executions","value":"1"},{"name":"Estimated Number of Rows for All Executions","value":"1"}],"children":[]},{"label":"Filter","metrics":[{"name":"Output List","value":"[master].[sys].[sysschobjs].id, [master].[sys].[sysschobjs].name, [master]."},{"name":"Estimated Row Size","value":"173 B"},{"name":"Estimated CPU Cost","value":"0.0040653"},{"name":"Estimated I/O Cost","value":"0"},{"name":"Estimated Rebinds","value":"0"},{"name":"Estimated Rewinds","value":"0"},{"name":"Estimated Execution Mode","value":"Row"},{"name":"Estimated Number of Rows Per Execution","value":"2573"},{"name":"Logical Operation","value":"Filter"},{"name":"Node ID","value":"4"},{"name":"Parallel","value":"False"},{"name":"Physical Operation","value":"Filter"},{"name":"EstimatedTotalSubtreeCost","value":"0.0371016"},{"name":"Predicate","value":"has_access(\'CO\',[master].[sys].[sysschobjs].[id] as [o].[id])=(1)"},{"name":"Startup Expression","value":"False"},{"name":"Estimated Number of Executions","value":"1"},{"name":"Estimated Number of Rows for All Executions","value":"2573"}],"icon":"filter","children":[{"label":"Compute Scalar","metrics":[{"name":"Output List","value":"[master].[sys].[sysschobjs].id, [master].[sys].[sysschobjs].name, [master]."},{"name":"Estimated Row Size","value":"175 B"},{"name":"Estimated CPU Cost","value":"0.0002573"},{"name":"Estimated I/O Cost","value":"0"},{"name":"Estimated Rebinds","value":"0"},{"name":"Estimated Rewinds","value":"0"},{"name":"Estimated Execution Mode","value":"Row"},{"name":"Estimated Number of Rows Per Execution","value":"2573"},{"name":"Logical Operation","value":"Compute Scalar"},{"name":"Node ID","value":"5"},{"name":"Parallel","value":"False"},{"name":"Physical Operation","value":"Compute Scalar"},{"name":"EstimatedTotalSubtreeCost","value":"0.0330363"},{"name":"Defined Values","value":"[Expr1003] = Scalar Operator(CONVERT(char(2),CASE WHEN [master].[sys].[syss"},{"name":"Estimated Number of Executions","value":"1"},{"name":"Estimated Number of Rows for All Executions","value":"2573"}],"icon":"computeScalar","children":[{"label":"Clustered Index Scan (Clustered)\\n[sysschobjs].[clst] [o]","metrics":[{"name":"Output List","value":"[master].[sys].[sysschobjs].id, [master].[sys].[sysschobjs].name, [master]."},{"name":"Estimated Row Size","value":"176 B"},{"name":"Estimated CPU Cost","value":"0.0029873"},{"name":"Estimated I/O Cost","value":"0.0297917"},{"name":"Estimated Rebinds","value":"0"},{"name":"Estimated Rewinds","value":"0"},{"name":"Estimated Execution Mode","value":"Row"},{"name":"Estimated Number of Rows Per Execution","value":"2573"},{"name":"Estimated Number of Rows to be Read","value":"2573"},{"name":"Logical Operation","value":"Clustered Index Scan"},{"name":"Node ID","value":"6"},{"name":"Parallel","value":"False"},{"name":"Physical Operation","value":"Clustered Index Scan"},{"name":"EstimatedTotalSubtreeCost","value":"0.032779"},{"name":"TableCardinality","value":"2573"},{"name":"Predicate","value":"[master].[sys].[sysschobjs].[nsclass] as [o].[nsclass]=(0) AND [master].[sy"},{"name":"Ordered","value":"False"},{"name":"Forced Index","value":"False"},{"name":"ForceScan","value":"False"},{"name":"NoExpandHint","value":"False"},{"name":"Storage","value":"RowStore"},{"name":"Object","value":"[master].[sys].[sysschobjs].[clst] [o]"},{"name":"Defined Values","value":"[master].[sys].[sysschobjs].id, [master].[sys].[sysschobjs].name, [master]."},{"name":"PhysicalOperationKind","value":"Clustered"},{"name":"Estimated Number of Executions","value":"1"},{"name":"Estimated Number of Rows for All Executions","value":"2573"}],"icon":"clusteredIndexScan","children":[]}]}]}]}]}]}';

	var graph = JSON.parse(s);

	return graph;
}

function getIconPaths(imageBasePath) {

	var iconPaths =
	{
		// generic icons
		iteratorCatchAll: imageBasePath + 'iterator_catch_all.png',

		cursorCatchAll: imageBasePath + 'cursor_catch_all.png',

		languageConstructCatchAll: imageBasePath + 'language_construct_catch_all.png',

		// operator icons
		adaptiveJoin: imageBasePath + 'adaptive_join.png',

		assert: imageBasePath + 'assert.png',

		bitmap: imageBasePath + 'bitmap.png',

		clusteredIndexDelete: imageBasePath + 'clustered_index_delete.png',

		clusteredIndexInsert: imageBasePath + 'clustered_index_insert.png',

		clusteredIndexScan: imageBasePath + 'clustered_index_scan.png',

		clusteredIndexSeek: imageBasePath + 'clustered_index_seek.png',

		clusteredIndexUpdate: imageBasePath + 'clustered_index_update.png',

		clusteredIndexMerge: imageBasePath + 'clustered_index_merge.png',

		clusteredUpdate: imageBasePath + 'clustered_update.png',

		collapse: imageBasePath + 'collapse.png',

		computeScalar: imageBasePath + 'compute_scalar.png',

		concatenation: imageBasePath + 'concatenation.png',

		constantScan: imageBasePath + 'constant_scan.png',

		deletedScan: imageBasePath + 'deleted_scan.png',

		filter: imageBasePath + 'filter.png',

		hashMatch: imageBasePath + 'hash_match.png',

		indexDelete: imageBasePath + 'index_delete.png',

		indexInsert: imageBasePath + 'index_insert.png',

		indexScan: imageBasePath + 'index_scan.png',

		columnstoreIndexDelete: imageBasePath + 'columnstore_index_delete.png',

		columnstoreIndexInsert: imageBasePath + 'columnstore_index_insert.png',

		columnstoreIndexMerge: imageBasePath + 'columnstore_index_merge.png',

		columnstoreIndexScan: imageBasePath + 'columnstore_index_scan.png',

		columnstoreIndexUpdate: imageBasePath + 'columnstore_index_update.png',

		indexSeek: imageBasePath + 'index_seek.png',

		indexSpool: imageBasePath + 'index_spool.png',

		indexUpdate: imageBasePath + 'index_update.png',

		insertedScan: imageBasePath + 'inserted_scan.png',

		logRowScan: imageBasePath + 'log_row_scan.png',

		mergeInterval: imageBasePath + 'merge_interval.png',

		mergeJoin: imageBasePath + 'merge_join.png',

		nestedLoops: imageBasePath + 'nested_loops.png',

		parallelism: imageBasePath + 'parallelism.png',

		parameterTableScan: imageBasePath + 'parameter_table_scan.png',

		print: imageBasePath + 'print.png',

		rank: imageBasePath + 'rank.png',

		foreignKeyReferencesCheck: imageBasePath + 'foreign_key_references_check.png',

		remoteDelete: imageBasePath + 'remote_delete.png',

		remoteIndexScan: imageBasePath + 'remote_index_scan.png',

		remoteIndexSeek: imageBasePath + 'remote_index_seek.png',

		remoteInsert: imageBasePath + 'remote_insert.png',

		remoteQuery: imageBasePath + 'remote_query.png',

		remoteScan: imageBasePath + 'remote_scan.png',

		remoteUpdate: imageBasePath + 'remote_update.png',

		ridLookup: imageBasePath + 'rid_lookup.png',

		rowCountSpool: imageBasePath + 'row_count_spool.png',

		segment: imageBasePath + 'segment.png',

		sequence: imageBasePath + 'sequence.png',

		sequenceProject: imageBasePath + 'sequence_project.png',

		sort: imageBasePath + 'sort.png',

		split: imageBasePath + 'split.png',

		streamAggregate: imageBasePath + 'stream_aggregate.png',

		switchStatement: imageBasePath + 'switch.png',

		tableValuedFunction: imageBasePath + 'table_valued_function.png',

		tableDelete: imageBasePath + 'table_delete.png',

		tableInsert: imageBasePath + 'table_insert.png',

		tableScan: imageBasePath + 'table_scan.png',

		tableSpool: imageBasePath + 'table_spool.png',

		tableUpdate: imageBasePath + 'table_update.png',

		tableMerge: imageBasePath + 'table_merge.png',

		tfp: imageBasePath + 'predict.png',

		top: imageBasePath + 'top.png',

		udx: imageBasePath + 'udx.png',

		batchHashTableBuild: imageBasePath + 'batch_hash_table_build.png',

		windowSpool: imageBasePath + 'table_spool.png',

		windowAggregate: imageBasePath + 'window_aggregate.png',

		// cursor operators
		fetchQuery: imageBasePath + 'fetch_query.png',

		populateQuery: imageBasePath + 'population_query.png',

		refreshQuery: imageBasePath + 'refresh_query.png',

		// shiloh operators
		result: imageBasePath + 'result.png',

		aggregate: imageBasePath + 'aggregate.png',

		assign: imageBasePath + 'assign.png',

		arithmeticExpression: imageBasePath + 'arithmetic_expression.png',

		bookmarkLookup: imageBasePath + 'bookmark_lookup.png',

		convert: imageBasePath + 'convert.png',

		declare: imageBasePath + 'declare.png',

		deleteOperator: imageBasePath + 'delete.png',

		dynamic: imageBasePath + 'dynamic.png',

		hashMatchRoot: imageBasePath + 'hash_match_root.png',

		hashMatchTeam: imageBasePath + 'hash_match_team.png',

		ifOperator: imageBasePath + 'if.png',

		insert: imageBasePath + 'insert.png',

		intrinsic: imageBasePath + 'intrinsic.png',

		keyset: imageBasePath + 'keyset.png',

		locate: imageBasePath + 'locate.png',

		populationQuery: imageBasePath + 'population_query.png',

		setFunction: imageBasePath + 'set_function.png',

		snapshot: imageBasePath + 'snapshot.png',

		spool: imageBasePath + 'spool.png',

		tsql: imageBasePath + 'sql.png',

		update: imageBasePath + 'update.png',

		// fake operators
		keyLookup: imageBasePath + 'bookmark_lookup.png',

		// PDW operators
		apply: imageBasePath + 'apply.png',

		broadcast: imageBasePath + 'broadcast.png',

		computeToControlNode: imageBasePath + 'compute_to_control_node.png',

		constTableGet: imageBasePath + 'const_table_get.png',

		controlToComputeNodes: imageBasePath + 'control_to_compute_nodes.png',

		externalBroadcast: imageBasePath + 'external_broadcast.png',

		externalExport: imageBasePath + 'external_export.png',

		externalLocalStreaming: imageBasePath + 'external_local_streaming.png',

		externalRoundRobin: imageBasePath + 'external_round_robin.png',

		externalShuffle: imageBasePath + 'external_shuffle.png',

		get: imageBasePath + 'get.png',

		groupByApply: imageBasePath + 'apply.png',

		groupByAggregate: imageBasePath + 'group_by_aggregate.png',

		join: imageBasePath + 'join.png',

		localCube: imageBasePath + 'intrinsic.png',

		project: imageBasePath + 'project.png',

		shuffle: imageBasePath + 'shuffle.png',

		singleSourceRoundRobin: imageBasePath + 'single_source_round_robin.png',

		singleSourceShuffle: imageBasePath + 'single_source_shuffle.png',

		trim: imageBasePath + 'trim.png',

		union: imageBasePath + 'union.png',

		unionAll: imageBasePath + 'union_all.png'
	};

	return iconPaths;
}
